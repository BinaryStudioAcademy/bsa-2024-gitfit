import { NOTHING_DELETED_COUNT } from "~/libs/constants/constants.js";
import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type UserPatchRequestDto } from "./libs/types/types.js";

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
		const numberDeletedRows = await this.userModel
			.query()
			.patch({ deletedAt: new Date().toISOString() })
			.where({ id })
			.whereNull("deletedAt")
			.execute();

		return numberDeletedRows > NOTHING_DELETED_COUNT;
	}

	public async find(id: number): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.findById(id)
			.whereNull("deletedAt")
			.returning("*")
			.execute();

		return user ? UserEntity.initialize(user) : null;
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel.query().whereNull("deletedAt").execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.findOne({ email })
			.whereNull("deletedAt")
			.execute();

		return user ? UserEntity.initialize(user) : null;
	}

	public async findByEmailCreate(email: string): Promise<null | UserEntity> {
		const user = await this.userModel.query().findOne({ email }).execute();

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
