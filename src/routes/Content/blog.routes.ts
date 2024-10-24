import AuthenticationMiddleware from '../../middlewares/authenticate';
import BlogController from '../../controllers/Content/blog.controller';
import ApiCache from '../../middlewares/apicache';
import { Router } from "express";

const blogRoutes = Router();

const blogController = new BlogController();
const authenticationMiddleware = new AuthenticationMiddleware();

blogRoutes.get("/:id",authenticationMiddleware.authenticateUser, ApiCache.getCache("2 minutes"), blogController.getBlog);
blogRoutes.post("/", authenticationMiddleware.authenticateUser, blogController.createBlog);
blogRoutes.put("/:id", authenticationMiddleware.authenticateUser, blogController.updateBlog);
blogRoutes.delete("/:id", authenticationMiddleware.authenticateUser, blogController.deleteBlog);
blogRoutes.get("/", authenticationMiddleware.authenticateUser, ApiCache.getCache("2 minutes"), blogController.getUserBlogs);

export default blogRoutes;
