import { Request, Response } from "express";
import  BlogService  from "../../services/Content/blog.service";
import UserService from '../../services/Auth/user.service';

const blogService = new BlogService();

class BlogController {
    getBlog = async (req: Request, res: Response) => {
        const { id } = req.body;
        try{
        const blog = await blogService.getBlog(id);
        res.status(201).json(blog);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    createBlog = async (req: Request, res: Response) => {
        const { userId,title, body } = req.body;
        try{
        const blog = await blogService.createBlog(userId,title, body);
        res.status(201).json(blog);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    updateBlog = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { title, body } = req.body;
        try{
        const blog = await blogService.updateBlog(parseInt(id),title, body);
        res.status(201).json(blog);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    deleteBlog = async (req: Request, res: Response) => {
        const id = req.params.id;
        const {userId} = req.body;
        try{
        const blog = await blogService.deleteBlog(parseInt(id));
        res.status(201).json(blog);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    getUserBlogs = async (req: Request, res: Response) => {
        const { userId } = req.body;
        try{
        const blogs = await blogService.getUserBlogs(userId);
        res.status(201).json(blogs);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default BlogController;
