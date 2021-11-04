import { Router } from "express";
import { LaboratoriesController } from "../../controllers/LaboratoriesController";
import { LaboratoriesMiddleware } from "../../middlewares/LaboratoriesMiddleware";

const labRouter = Router();

labRouter.post('/labs', LaboratoriesController.create);
labRouter.get('/labs', LaboratoriesController.list);
labRouter.patch('/labs/:id', LaboratoriesMiddleware.laboratoryExists, LaboratoriesController.update);
labRouter.delete('/labs/:id', LaboratoriesMiddleware.laboratoryExists, LaboratoriesController.delete);

export default labRouter;