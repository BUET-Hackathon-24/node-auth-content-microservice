import { Request, Response } from "express";
import  BlogService  from "../../services/Content/blog.service";

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
        const { id,title, body } = req.body;
        try{
        const blog = await blogService.updateBlog(id,title, body);
        res.status(201).json(blog);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    deleteBlog = async (req: Request, res: Response) => {
        const { id } = req.body;
        try{
        const blog = await blogService.deleteBlog(id);
        res.status(201).json(blog);
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default BlogController;
