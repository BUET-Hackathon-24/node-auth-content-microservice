import { Router } from "express";
import UpvoteController from "../../controllers/Content/upvote.controller";

const upvoteRoutes = Router();
const upvoteController = new UpvoteController();

upvoteRoutes.post("/post", upvoteController.upvotePost);
upvoteRoutes.post("/blog", upvoteController.upvoteBlog);
upvoteRoutes.post("/vlog", upvoteController.upvoteVlog);

export default upvoteRoutes;