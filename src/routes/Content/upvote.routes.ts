import { Router } from "express";
import UpvoteController from "../../controllers/Content/upvote.controller";

const upvoteRoutes = Router();
const upvoteController = new UpvoteController();

upvoteRoutes.post("/", upvoteController.upvotePost);

export default upvoteRoutes;