import { SortType } from "~/libs/enums/enums.js";
import {
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import {
	type UserGetAllQueryParameters,
	type UserPatchRequestDto,
} from "./libs/types/types.js";

class UserRepository implements Repository {
	private userModel: typeof UserModel;
	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, name, passwordHash, passwordSalt } = entity.toNewObject();

		const user = await this.userModel
			.query()
			.insert({
				email,
				name,
				passwordHash,
				passwordSalt,
			})
			.returning("*")
			.execute();

		return UserEntity.initialize(user);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedRowsCount = await this.userModel
			.query()
			.patch({ deletedAt: new Date().toISOString() })
			.where({ id })
			.whereNull("deletedAt")
			.execute();

		return Boolean(deletedRowsCount);
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.findById(id)
			.whereNull("deletedAt")
			.withGraphFetched(
				"[groups.permissions, projectGroups.[permissions, projects]]",
			)
			.modifyGraph("groups", (builder) => {
				builder.select("userGroups.id", "name");
			})
			.modifyGraph("groups.permissions", (builder) => {
				builder.select("permissions.id", "name", "key");
			})
			.modifyGraph("projectGroups", (builder) => {
				builder.select("projectGroups.id", "name");
			})
			.modifyGraph("projectGroups.projects", (builder) => {
				builder.select("projects.id");
			})
			.modifyGraph("projectGroups.permissions", (builder) => {
				builder.select("projectPermissions.id", "name", "key");
			})
			.execute();

		return user ? UserEntity.initialize(user) : null;
	}

	public async findAll(
		parameters: UserGetAllQueryParameters,
	): Promise<PaginationResponseDto<UserEntity>> {
		const { name, page, pageSize } = parameters;

		const query = this.userModel
			.query()
			.orderBy("createdAt", SortType.DESCENDING)
			.withGraphFetched("[groups.permissions, projectGroups]")
			.whereNull("deletedAt");

		if (name) {
			query.where("name", "ilike", `%${name}%`);
		}

		const { results, total } = await query.page(page, pageSize).execute();

		return {
			items: results.map((user) => UserEntity.initialize(user)),
			totalItems: total,
		};
	}

	public async findAllWithProjectPermissions(
		permissionKeys: string[],
		projectId: number,
	): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphFetched("projectGroups.[permissions]")
			.modifyGraph("projectGroups.permissions", (builder) => {
				builder.whereIn("key", permissionKeys);
			})
			.whereExists(
				this.userModel
					.relatedQuery("projectGroups")
					.joinRelated("permissions")
					.join(
						"projectsToProjectGroups",
						"projectGroups.id",
						"projectsToProjectGroups.projectGroupId",
					)
					.whereIn("permissions.key", permissionKeys)
					.where("projectsToProjectGroups.projectId", projectId),
			)
			.whereNull("deletedAt")
			.execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public async findAllWithRootPermissions(
		permissionKeys: string[],
	): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphFetched("groups.[permissions]")
			.modifyGraph("groups.permissions", (builder) => {
				builder.whereIn("key", permissionKeys);
			})
			.whereExists(
				this.userModel
					.relatedQuery("groups")
					.joinRelated("permissions")
					.whereIn("permissions.key", permissionKeys),
			)
			.whereNull("deletedAt")
			.execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public async findByEmail(
		email: string,
		hasDeleted = false,
	): Promise<null | UserEntity> {
		const query = this.userModel
			.query()
			.findOne({ email })
			.whereNull("deletedAt")
			.withGraphFetched(
				"[groups.permissions, projectGroups.[permissions, projects]]",
			)
			.modifyGraph("groups", (builder) => {
				builder.select("userGroups.id", "name");
			})
			.modifyGraph("groups.permissions", (builder) => {
				builder.select("permissions.id", "name", "key");
			})
			.modifyGraph("projectGroups", (builder) => {
				builder.select("projectGroups.id", "name");
			})
			.modifyGraph("projectGroups.projects", (builder) => {
				builder.select("projects.id");
			})
			.modifyGraph("projectGroups.permissions", (builder) => {
				builder.select("projectPermissions.id", "name", "key");
			});

		if (!hasDeleted) {
			query.whereNull("deletedAt");
		}

		const user = await query.execute();

		return user ? UserEntity.initialize(user) : null;
	}

	public async patch(
		userId: number,
		data: UserPatchRequestDto,
	): Promise<UserEntity> {
		const user = await this.userModel.query().patchAndFetchById(userId, {
			name: data.name,
		});

		return UserEntity.initialize(user);
	}

	public update(): ReturnType<Repository["update"]> {
		return Promise.resolve();
	}
}

export { UserRepository };
