import AuthenticationMiddleware from '../../middlewares/authenticate';
import PlanController from '../../controllers/Content/plan.controller';
import { Router } from "express";

const planRoutes = Router();

const planController = new PlanController();
const authenticationMiddleware = new AuthenticationMiddleware();

planRoutes.get("/:id", authenticationMiddleware.authenticateUser, planController.getPlan);
planRoutes.post("/", authenticationMiddleware.authenticateUser, planController.createPlan);
planRoutes.put("/:id", authenticationMiddleware.authenticateUser, planController.updatePlan);
planRoutes.delete("/:id", authenticationMiddleware.authenticateUser, planController.deletePlan);
planRoutes.get("/", authenticationMiddleware.authenticateUser, planController.getUserPlans);

export default planRoutes;

