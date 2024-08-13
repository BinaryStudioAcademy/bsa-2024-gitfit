import { Model } from "objection";

class Abstract extends Model {
	public createdAt!: string;

	public id!: number;

	public updatedAt!: string;

	public override $beforeInsert(): void {
		const insertDate = new Date().toISOString();

		this.createdAt = insertDate;
		this.updatedAt = insertDate;
	}

	public override $beforeUpdate(): void {
		this.updatedAt = new Date().toISOString();
	}
}

export { Abstract };
