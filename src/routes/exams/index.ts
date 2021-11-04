import { Router, Request, Response } from "express";
import { ExamsController } from "../../controllers/ExamsController";
import { ExamsMiddleware } from "../../middlewares/ExamsMiddleware";
import { GlobalMiddleware } from "../../middlewares/GlobalMiddleware";

const examsRouter = Router();

examsRouter.post('/exams', ExamsController.create);
examsRouter.get('/exams', ExamsController.list);
examsRouter.get('/exams/laboratories', ExamsController.listLaboratories);
examsRouter.delete('/exams/:id', ExamsMiddleware.examExists, ExamsController.delete);
examsRouter.patch('/exams/:id', ExamsMiddleware.examExists, ExamsController.update);
examsRouter.delete('/exam/:exam_id/laboratory/:laboratory_id/disassociate', GlobalMiddleware.examAndLaboratoryExists, ExamsController.disassociateLaboratory);
examsRouter.post('/exam/:exam_id/laboratory/:laboratory_id/associate', GlobalMiddleware.examAndLaboratoryExists, ExamsController.associateLaboratory);

export default examsRouter;