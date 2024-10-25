import UpvoteService from "../../services/Content/upvote.service";
import { Request, Response } from "express";


class UpvoteController {
    upvoteService = new UpvoteService();
    async upvotePost(req: Request, res: Response) : Promise<any> {
        const { postId, userId } = req.body;
        const result = await UpvoteService.upvotePost(postId, userId);
        console.log(result);
        return res.status(200).json(result);
    }
    async upvoteBlog(req: Request, res: Response) : Promise<any> {
        const { blogId, userId } = req.body;
        const result = await UpvoteService.upvoteBlog(blogId, userId);
        console.log(result);
        return res.status(200).json(result);
    }
    async upvoteVlog(req: Request, res: Response) : Promise<any> {
        const { vlogId, userId } = req.body;
        const result = await UpvoteService.upvoteVlog(vlogId, userId);
        console.log(result);
        return res.status(200).json(result);
    }
}

export default UpvoteController;