import { Router } from "express";
import UpvoteController from "../../controllers/Content/upvote.controller";
import AuthenticationMiddleware from "../../middlewares/authenticate";
const upvoteRoutes = Router();
const upvoteController = new UpvoteController();
const authenticationMiddleware = new AuthenticationMiddleware();

upvoteRoutes.post("/post", authenticationMiddleware.authenticateUser, upvoteController.upvotePost);
upvoteRoutes.post("/blog", authenticationMiddleware.authenticateUser, upvoteController.upvoteBlog);
upvoteRoutes.post("/vlog", authenticationMiddleware.authenticateUser, upvoteController.upvoteVlog);

export default upvoteRoutes;