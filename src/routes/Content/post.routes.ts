import { Router } from "express";
import PostController from "../../controllers/Content/post.controller";
import AuthenticationMiddleware from "../../middlewares/authenticate"

const postRoutes = Router();

const postController = new PostController();
const authenticationMiddleware = new AuthenticationMiddleware();

postRoutes.post("/", authenticationMiddleware.authenticateUser, postController.createPost);
postRoutes.get("/", authenticationMiddleware.authenticateUser, postController.getPostsOfUser);
export default postRoutes;
