import { getConnection, getRepository } from "typeorm";
import { Exam } from "../entity/Exam";

export class ExamsRepository {
    static async create(values: object) {
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Exam)
            .values(values)
            .returning("id")
            .execute();
    }

    static async list() {
        return await getRepository(Exam).find({
            where: {
                status: 'ATIVO'
            }
        });
    }

    static async update(values) {
        return await getConnection()
            .createQueryBuilder()
            .update(Exam)
            .set({
                name: values.name,
                type: values.type
            })
            .where("id = :id", { id: values.id })
            .execute();
    }

    static async delete(id) {
        await getRepository(Exam).delete({
            id: id
        });
    }

    static async getByName(exam_name) {
        return await getRepository(Exam).findOne({
            where: {
                name: exam_name.toUpperCase()
            }
        });
    }   

    static async listLaboratories(exam_name) {
        const exam = await ExamsRepository.getByName(exam_name);
        const laboratories = await getRepository(Exam).findOne({
            where: {
                name: exam.name
            }
        });

        return laboratories.laboratories;
    }

    static async get(id) {
        return await getRepository(Exam).findOne({
            where: {
                id: id
            }
        });
    }

}