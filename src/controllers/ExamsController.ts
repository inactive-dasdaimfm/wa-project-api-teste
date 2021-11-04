import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Exam } from "../entity/Exam";
import { ExamsRepository } from "../repositories/ExamsRepository";
import { LaboratoriesRepository } from "../repositories/LaboratoriesRepository";

export class ExamsController {
    static async create(req: Request, res: Response) {
        var { name, type, laboratory } = req.body;

        var labs = [];

        for await(let x of laboratory) {
            let lab = await LaboratoriesRepository.findOneByName(x);
            labs.push(lab.id);
        }

        name = name.toUpperCase();

        var laboratories = labs;
        
        await ExamsRepository.create({ name, type, laboratories });
        
        return res.status(204).send();
    }

    static async list(req: Request, res: Response) {
        const exams = await ExamsRepository.list();

        for(let i = 0; i < exams.length; i++) {
            var labs = exams[i].laboratories;
            var nextLabs = [];

            for await(let lab_id of labs) {
                let lab = await LaboratoriesRepository.get(lab_id);
                nextLabs.push(lab);
            }
            
            exams[i].laboratories = nextLabs;
        }

        return res.json({
            "error": false,
            "msg": exams
        });
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        await ExamsRepository.delete(id);

        return res.status(204).send();
    }

    static async update(req: Request, res: Response) {
        const id = req.params.id;
        const { name, type } = req.body;

        await ExamsRepository.update({ id, name, type });

        return res.status(201).json({
            "error": false,
            "msg": "Exam updated with success"
        });
    }

    static async listLaboratories(req: Request, res: Response) {
        const name = req.query.name;
        const labs = await ExamsRepository.listLaboratories(name);

        var laboratories = [];

        for await(let lab_id of labs) {
            let lab = await LaboratoriesRepository.get(lab_id);
            laboratories.push(lab);
        }

        return res.json({
            "error": false,
            "msg": laboratories
        });
    }

    static async disassociateLaboratory(req: Request, res: Response) {
        const lab_id = req.params.laboratory_id;
        const exam_id = req.params.exam_id;

        var exam = await ExamsRepository.get(exam_id);
        exam.laboratories = exam.laboratories.filter(item => item !== parseInt(lab_id));
        
        await getRepository(Exam).update(exam_id, exam);

        res.status(204).send();
    }

    static async associateLaboratory(req: Request, res: Response) {
        const lab_id = req.params.laboratory_id;
        const exam_id = req.params.exam_id;

        var exam = await ExamsRepository.get(exam_id);
        exam.laboratories.push(lab_id);

        await getRepository(Exam).update(exam_id, exam);

        return res.status(204).send();
    }
}