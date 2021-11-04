import { Request, Response, NextFunction } from "express";
import { ExamsRepository } from "../repositories/ExamsRepository";
import { LaboratoriesRepository } from "../repositories/LaboratoriesRepository";

export class GlobalMiddleware {
    static async examAndLaboratoryExists(req: Request, res: Response, next: NextFunction) {
        var exam_id = req.params.exam_id;
        var laboratory_id = req.params.laboratory_id;

        if (!exam_id || !laboratory_id) {
            return res.status(400).json({
                "error": true,
                "msg": "Bad param for exam_id or laboratory_id"
            });
        }

        var exam = ExamsRepository.get(exam_id);
        var lab = LaboratoriesRepository.get(laboratory_id);

        if (!exam || !lab) {
            return res.status(400).json({
                "error": true,
                "msg": "Exam or laboratory not found"
            });
        }

        next();
    }
}