import { Request, Response } from "express";
import { LaboratoriesRepository } from "../repositories/LaboratoriesRepository";

export class LaboratoriesController {
    static async create(req: Request, res: Response) {
        var { name, address } = req.body;
        
        name = name.toUpperCase();
        
        await LaboratoriesRepository.create({ name, address });

        return res.status(204).send();
    }

    static async list(req: Request, res: Response) {
        const laboratories = await LaboratoriesRepository.list();

        return res.json({
            "error": false,
            "msg": laboratories
        });
    }

    static async update(req: Request, res: Response) {
        const { name, address } = req.body;
        const id = req.params.id;
        
        const lab = {id, name, address}
        await LaboratoriesRepository.update(lab);

        return res.status(201).json({
            "error": false,
            "msg": `Laboratory ${id} updated with success`
        });
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        await LaboratoriesRepository.delete(id);

        return res.status(204).send();
    }
}