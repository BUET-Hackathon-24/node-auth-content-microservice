import FollowerService from "../../services/Content/follower.service";
import { Request, Response } from "express";

export default class FollowerController {
    private followerService = new FollowerService();

    async getFollowers(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const followers = await this.followerService.getFollowers(Number(userId));
            res.json(followers);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async addFollower(req: Request, res: Response) {
        try {
            const { influencerId, userId } = req.body;
            const follower = await this.followerService.addFollower(influencerId, userId);
            res.json(follower);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getFollowing(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const following = await this.followerService.getFollowing(userId);
            res.json(following);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
