import BaseModel from "../base.model";

export default class FollowerModel extends BaseModel {
    constructor() {
        super();
    }
    async getFollowers(influencerId: number) {
        try {
            const sql = `SELECT * FROM follower WHERE influencer_id = $1 JOIN user ON user.id = follower.user_id`;
            const result = await this.query(sql, [influencerId]);
            return result;
        } catch (error) {
            console.error('Error fetching followers:', error);
            throw error; // Re-throw the error after logging
        }
    }
    async addFollower(influencerId: number, userId: number) {
        try {
            const sql = `INSERT INTO follower (influencer_id, follower_id) VALUES ($1, $2)`;
            const result = await this.query(sql, [influencerId, userId]);
            return result;
        } catch (error) {
            console.error('Error adding follower:', error);
            throw error; // Re-throw the error after logging
        }
    }
    async getFollowing(userId: number) {
        try {
            const sql = `
            SELECT * FROM follower WHERE follower_id = $1
            JOIN user ON user.id = follower.influencer_id
            `;
            const result = await this.query(sql, [userId]);
            return result;
        } catch (error) {
            console.error('Error fetching following:', error);
            throw error; // Re-throw the error after logging
        }
    }
}
