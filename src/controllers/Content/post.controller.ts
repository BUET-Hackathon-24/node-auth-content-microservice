import PostService from "../../services/Content/post.service";
import { Request, Response } from "express";

class PostController {
    postService = new PostService();

    createPost = async (req: Request, res: Response) : Promise<void>     => {
        try {
            const { caption, location, userId, files } = req.body;

            if (!userId) {
                res.status(400).json({ error: 'Invalid or missing userId' });
                return;
            }
            const post = await this.postService.createPost(caption, location, parseInt(userId), files);
            res.status(201).json(post);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'An error occurred while creating the post' });
        }
    }

    getPostsOfUser = async (req: Request, res: Response) : Promise<void> => {
        try {
            const userId = req.body.userId;
            console.log("userId in getPostsOfUse in controller: ", userId);
            const posts = await this.postService.getPostsOfUser(parseInt(userId));
            res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'An error occurred while fetching posts' });
        }
    }
}

export default PostController;
