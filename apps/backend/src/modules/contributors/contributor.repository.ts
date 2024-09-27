import { raw } from "objection";

import { EMPTY_LENGTH, PAGE_INDEX_OFFSET } from "~/libs/constants/constants.js";
import { SortType } from "~/libs/enums/enums.js";
import {
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";
import { type GitEmailModel } from "~/modules/git-emails/git-emails.js";

import { ContributorEntity } from "./contributor.entity.js";
import { type ContributorModel } from "./contributor.model.js";
import { ContributorOrderByKey } from "./libs/enums/enums.js";
import {
	type ContributorGetAllQueryParameters,
	type ContributorMergeRequestDto,
	type ContributorPatchRequestDto,
} from "./libs/types/types.js";

class ContributorRepository implements Repository {
	private contributorModel: typeof ContributorModel;
	private gitEmailModel: typeof GitEmailModel;

	public constructor(
		contributorModel: typeof ContributorModel,
		gitEmailModel: typeof GitEmailModel,
	) {
		this.contributorModel = contributorModel;
		this.gitEmailModel = gitEmailModel;
	}

	public async create(entity: ContributorEntity): Promise<ContributorEntity> {
		const { name } = entity.toNewObject();

		const contributor = await this.contributorModel
			.query()
			.insert({ name })
			.execute();

		return ContributorEntity.initialize(contributor);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<ContributorEntity | null> {
		const contributor = await this.contributorModel
			.query()
			.findById(id)
			.withGraphFetched("gitEmails");

		if (!contributor) {
			return null;
		}

		return ContributorEntity.initialize(contributor);
	}

	public async findAll({
		contributorName,
		hasHidden = false,
		orderBy = ContributorOrderByKey.CREATED_AT,
		page,
		pageSize,
		permittedProjectIds = [],
		projectId,
	}: {
		permittedProjectIds?: number[] | undefined;
	} & ContributorGetAllQueryParameters): Promise<
		PaginationResponseDto<ContributorEntity>
	> {
		const query = this.contributorModel
			.query()
			.select("contributors.*")
			.select(
				raw(
					"COALESCE(ARRAY_AGG(DISTINCT jsonb_build_object('id', projects.id, 'name', projects.name)) FILTER (WHERE projects.id IS NOT NULL), '{}') AS projects",
				),
			)
			.select(
				raw(
					"MAX(CASE WHEN activity_logs.commits_number > 0 THEN activity_logs.date ELSE NULL END) AS last_activity_date",
				),
			)
			.leftJoin("gitEmails", "contributors.id", "gitEmails.contributorId")
			.leftJoin("activityLogs", "gitEmails.id", "activityLogs.gitEmailId")
			.leftJoin("projects", "activityLogs.projectId", "projects.id")
			.groupBy("contributors.id")
			.withGraphFetched("gitEmails");

		if (!hasHidden) {
			query.whereNull("contributors.hiddenAt");
		}

		if (contributorName) {
			query.whereILike("contributors.name", `%${contributorName}%`);
		}

		if (projectId) {
			query.havingRaw("?? = ANY(ARRAY_AGG(projects.id))", projectId);
		}

		const hasPermissionedProjects = permittedProjectIds.length !== EMPTY_LENGTH;

		if (hasPermissionedProjects) {
			query.whereIn("projects.id", permittedProjectIds);
		}

		query.orderBy(orderBy, SortType.DESCENDING);

		let contributors, totalItems;

		if (page && pageSize) {
			const { results, total } = await query.page(
				page - PAGE_INDEX_OFFSET,
				pageSize,
			);
			contributors = results;
			totalItems = total;
		} else {
			contributors = await query;
			totalItems = contributors.length;
		}

		return {
			items: contributors.map((contributor) => {
				return ContributorEntity.initialize(contributor);
			}),
			totalItems,
		};
	}

	public async findByName(name: string): Promise<ContributorEntity | null> {
		const contributor = await this.contributorModel
			.query()
			.findOne({ name })
			.withGraphFetched("gitEmails");

		if (!contributor) {
			return null;
		}

		return ContributorEntity.initialize(contributor);
	}

	public async merge(
		currentContributorId: number,
		{ selectedContributorId }: ContributorMergeRequestDto,
	): Promise<ContributorEntity | null> {
		const result = await this.contributorModel.transaction(async (trx) => {
			const selectedContributor = await this.contributorModel
				.query(trx)
				.findById(selectedContributorId)
				.withGraphFetched("gitEmails");

			const gitEmails = selectedContributor?.gitEmails ?? [];

			await this.gitEmailModel
				.query(trx)
				.patch({ contributorId: currentContributorId })
				.whereIn(
					"id",
					gitEmails.map((email) => email.id),
				);

			await this.contributorModel.query(trx).deleteById(selectedContributorId);

			return await this.contributorModel
				.query(trx)
				.select("contributors.*")
				.select(
					raw(
						"COALESCE(ARRAY_AGG(DISTINCT jsonb_build_object('id', projects.id, 'name', projects.name)) FILTER (WHERE projects.id IS NOT NULL), '{}') AS projects",
					),
				)
				.leftJoin("gitEmails", "contributors.id", "gitEmails.contributorId")
				.leftJoin("activityLogs", "gitEmails.id", "activityLogs.gitEmailId")
				.leftJoin("projects", "activityLogs.projectId", "projects.id")
				.groupBy("contributors.id")
				.withGraphFetched("gitEmails")
				.modifyGraph("gitEmails", (builder) => {
					builder.select("id", "email");
				})
				.findById(currentContributorId);
		});

		if (!result) {
			return null;
		}

		return ContributorEntity.initialize(result);
	}

	public async patch(
		contributorId: number,
		data: ContributorPatchRequestDto,
	): Promise<ContributorEntity | null> {
		const hiddenAt = data.isHidden ? new Date().toISOString() : null;
		const contributor = await this.contributorModel
			.query()
			.patchAndFetchById(contributorId, {
				hiddenAt,
				name: data.name,
			});

		return ContributorEntity.initialize(contributor);
	}

	public async split(
		gitEmailId: number,
		newContributorName: string,
	): Promise<ContributorEntity> {
		const result = await this.contributorModel.transaction(async (trx) => {
			const newContributor = await this.contributorModel
				.query(trx)
				.insert({ name: newContributorName })
				.execute();

			await this.gitEmailModel
				.query(trx)
				.patchAndFetchById(gitEmailId, { contributorId: newContributor.id });

			return await this.contributorModel
				.query(trx)
				.select("contributors.*")
				.select(
					raw(
						"COALESCE(ARRAY_AGG(DISTINCT jsonb_build_object('id', projects.id, 'name', projects.name)) FILTER (WHERE projects.id IS NOT NULL), '{}') AS projects",
					),
				)
				.leftJoin("gitEmails", "contributors.id", "gitEmails.contributorId")
				.leftJoin("activityLogs", "gitEmails.id", "activityLogs.gitEmailId")
				.leftJoin("projects", "activityLogs.projectId", "projects.id")
				.groupBy("contributors.id")
				.withGraphFetched("gitEmails")
				.modifyGraph("gitEmails", (builder) => {
					builder.select("id", "email");
				})
				.findById(newContributor.id);
		});

		return ContributorEntity.initialize(result as ContributorModel);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve(null);
	}
}

export { ContributorRepository };
