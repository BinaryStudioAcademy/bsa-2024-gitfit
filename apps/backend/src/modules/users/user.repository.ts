import {
	type PaginationQueryParameters,
	type PaginationResponseDto,
	type Repository,
} from "~/libs/types/types.js";
import { type PermissionGetAllResponseDto } from "~/modules/permissions/libs/types/types.js";
import { PermissionModel } from "~/modules/permissions/permission.model.js";
import {
	type UserAuthResponseDto,
	type UserPatchRequestDto,
} from "~/modules/users/libs/types/types.js";
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

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphFetched("groups.permissions")
			.modifyGraph("groups", (builder) => {
				builder.select("name");
			})
			.modifyGraph("groups.permissions", (builder) => {
				builder.select("name", "key");
			})
			.castTo<
				UserAuthResponseDto & { passwordSalt: string; passwordHash: string }
			>();

		return UserEntity.initialize(user);
	}

	public async findAll({
		page,
		pageSize,
	}: PaginationQueryParameters): Promise<PaginationResponseDto<UserEntity>> {
		const { results, total } = await this.userModel
			.query()
			.page(page, pageSize);

		return {
			items: results.map((user) => UserEntity.initialize(user)),
			totalItems: total,
		};
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.findOne({ email })
			.withGraphFetched("groups.permissions")
			.modifyGraph("groups", (builder) => {
				builder.select("name");
			})
			.modifyGraph("groups.permissions", (builder) => {
				builder.select("name", "key");
			})
			.castTo<
				UserAuthResponseDto & { passwordSalt: string; passwordHash: string }
			>();

		return UserEntity.initialize(user);
	}

	public async getPermissionsByUserId(
		userId: number,
	): Promise<PermissionGetAllResponseDto> {
		const permissions = await this.userModel
			.relatedQuery("groups")
			.for(userId)
			.joinRelated("permissions")
			.distinct("permissions.*")
			.castTo(PermissionModel);

		return {
			items: permissions.map((permission) => ({
				id: permission.id,
				key: permission.key,
				name: permission.name,
			})),
		};
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
