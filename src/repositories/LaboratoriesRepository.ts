import { getConnection, getRepository } from "typeorm";
import { Laboratory } from "../entity/Laboratory";

export class LaboratoriesRepository {
    static async create(values: object) {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Laboratory)
            .values(values)
            .execute();
    }

    static async findOneByName(name: string) {
        return await getRepository(Laboratory).findOne({
            where: {
                name: name.toUpperCase()
            }
        });
    }

    static async list() {
        return await getRepository(Laboratory).find({
            where: {
                status: "ATIVO"
            }
        });
    }

    static async update(lab) {
        return await getConnection()
            .createQueryBuilder()
            .update(Laboratory)
            .set({
                name: lab.name,
                address: lab.address
            })
            .where("id = :id", { id: lab.id })
            .execute();
    }

    static async delete(id) {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Laboratory)
            .where("id = :id", { id: id })
            .execute();
    }

    static async get(id) {
        return await getRepository(Laboratory).findOne({
            where: {
                id: id
            }
        });
    }
}