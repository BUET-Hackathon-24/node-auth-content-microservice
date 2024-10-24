import { Request, Response } from "express";
import PlanService from "../../services/Content/plan.service";

const planService = new PlanService();

class PlanController {
    getPlan = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const plan = await planService.getPlan(Number(id));
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    createPlan = async (req: Request, res: Response) => {
        const { userId, title, data } = req.body;
        try {
            const plan = await planService.createPlan(userId, title, data);
            res.status(201).json(plan);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    updatePlan = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, data } = req.body;
        try {
            const plan = await planService.updatePlan(Number(id), title, data);
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    deletePlan = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const plan = await planService.deletePlan(Number(id));
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default PlanController;

    