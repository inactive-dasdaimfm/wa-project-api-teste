import { Request, Response, NextFunction } from "express";
import { LaboratoriesRepository } from "../repositories/LaboratoriesRepository";

export class LaboratoriesMiddleware {
    static async laboratoryExists(req: Request, res: Response, next: NextFunction) {
        var laboratory_id = req.params.id;

        if (!laboratory_id) {
            return res.status(400).json({
                "error": true,
                "msg": "Missing laboratory_id parameter"
            });
        }

        var laboratory = await LaboratoriesRepository.get(laboratory_id);

        if (!laboratory) {
            return res.status(400).json({
                "error": true,
                "msg": "Laboratory not found"
            });
        }

        next();
    }
}