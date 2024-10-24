import UpvoteService from "../../services/Content/upvote.service";
import { Request, Response } from "express";

class UpvoteController {
    async upvotePost(req: Request, res: Response) {
        const { postId, userId } = req.body;
        const upvoteService = new UpvoteService();
        await upvoteService.upvotePost(postId, userId);
    }
}

export default UpvoteController;