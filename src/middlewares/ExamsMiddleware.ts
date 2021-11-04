import { Request, Response, NextFunction } from "express";
import { ExamsRepository } from "../repositories/ExamsRepository";

export class ExamsMiddleware {
    static async examExists(req: Request, res: Response, next: NextFunction) {
        var exam_id = req.params.id;

        if (!exam_id) {
            return res.status(400).json({
                "error": true,
                "msg": "Missing exam_id parameter"
            });
        }

        var exam = await ExamsRepository.get(exam_id);

        if (!exam) {
            return res.status(400).json({
                "error": true,
                "msg": "Exam not found"
            });
        }

        next();
    }
}