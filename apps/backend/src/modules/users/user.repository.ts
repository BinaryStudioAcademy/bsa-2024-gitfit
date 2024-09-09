import {
	type PaginationQueryParameters,
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";
import { type UserPatchRequestDto } from "~/modules/users/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

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
			.withGraphFetched("groups.permissions")
			.modifyGraph("groups", (builder) => {
				builder.select("user_groups.id", "name");
			})
			.modifyGraph("groups.permissions", (builder) => {
				builder.select("permissions.id", "name", "key");
			})
			.execute();

		return user ? UserEntity.initialize(user) : null;
	}

	public async findAll({
		page,
		pageSize,
	}: PaginationQueryParameters): Promise<PaginationResponseDto<UserEntity>> {
		const { results, total } = await this.userModel
			.query()
			.whereNull("deletedAt")
			.page(page, pageSize);

		return {
			items: results.map((user) => UserEntity.initialize(user)),
			totalItems: total,
		};
	}

	public async findByEmail(
		email: string,
		hasDeleted = false,
	): Promise<null | UserEntity> {
		const query = this.userModel
			.query()
			.findOne({ email })
			.withGraphFetched("groups.permissions")
			.modifyGraph("user_groups.id", (builder) => {
				builder.select("id", "name");
			})
			.modifyGraph("groups.permissions", (builder) => {
				builder.select("permissions.id", "name", "key");
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
