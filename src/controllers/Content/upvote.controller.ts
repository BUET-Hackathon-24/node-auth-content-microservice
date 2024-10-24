import UpvoteService from "../../services/Content/upvote.service";
import { Request, Response } from "express";

class UpvoteController {
    async upvotePost(req: Request, res: Response) {
        const { postId, userId } = req.body;
        const upvoteService = new UpvoteService();
        await upvoteService.upvotePost(postId, userId);
    }
    async upvoteBlog(req: Request, res: Response) {
        const { blogId, userId } = req.body;
        const upvoteService = new UpvoteService();
        await upvoteService.upvoteBlog(blogId, userId);
    }
    async upvoteVlog(req: Request, res: Response) {
        const { vlogId, userId } = req.body;
        const upvoteService = new UpvoteService();
        await upvoteService.upvoteVlog(vlogId, userId);
    }
}

export default UpvoteController;