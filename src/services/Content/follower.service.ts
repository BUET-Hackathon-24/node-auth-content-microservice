import FollowerModel from "../../models/Content/follower.model";

export default class FollowerService {
    private followerModel = new FollowerModel();

    async getFollowers(influencerId: number) {
        try {
            return this.followerModel.getFollowers(influencerId);
        } catch (error) {
            console.error('Error fetching followers:', error);
            throw error; // Re-throw the error after logging
        }
    }
    async addFollower(influencerId: number, userId: number) {
        try {
            return this.followerModel.addFollower(influencerId, userId);
        } catch (error) {
            console.error('Error adding follower:', error);
            throw error; // Re-throw the error after logging
        }
    }
    async getFollowing(userId: number) {
        try {
            return this.followerModel.getFollowing(userId);
        } catch (error) {
            console.error('Error fetching following:', error);
            throw error; // Re-throw the error after logging
        }
    }
}
