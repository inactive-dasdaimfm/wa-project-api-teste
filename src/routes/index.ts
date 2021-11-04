import { Request, Response, Router } from "express";
import examsRouter from "./exams";
import labRouter from "./laboratories";

const routes = Router();

routes.use(labRouter);
routes.use(examsRouter);

export default routes;