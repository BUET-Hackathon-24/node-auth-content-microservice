import BaseModel from "../base.model";

export default class FollowerModel extends BaseModel {
    constructor() {
        super();
    }
    async getFollowers(influencerId: number) {
        try {
            const sql = `SELECT * FROM follower JOIN users ON users.id = follower.follower_id WHERE influencer_id = $1`;
            const result = await this.query(sql, [influencerId]);
            return result;
        } catch (error) {
            console.error('Error fetching followers:', error);
            throw error; // Re-throw the error after logging
        }
    }
    async addFollower(influencerId: number, userId: number) {
        try {
            const sql = `
                WITH new_follower AS (
                    INSERT INTO follower (influencer_id, follower_id)
                    SELECT $1, $2
                    WHERE NOT EXISTS (
                        SELECT 1 FROM follower
                        WHERE influencer_id = $1 AND follower_id = $2
                    )
                    RETURNING *
                )
                SELECT EXISTS (SELECT 1 FROM new_follower) AS inserted;
            `;
            const result = await this.query(sql, [influencerId, userId]);
            
            if (result[0].inserted) {
                // Follower was added, update counts and create notification
                const sql2 = `UPDATE users SET follower_count = follower_count + 1 WHERE id = $1`;
                const sql3 = `UPDATE users SET following_count = following_count + 1 WHERE id = $1`;
                const sql4 = `INSERT INTO notification (sender_id, reciever_id, content_id, content_type) VALUES ($1, $2, $3, $4)`;
                
                await Promise.all([
                    this.query(sql2, [influencerId]),
                    this.query(sql3, [userId]),
                    this.query(sql4, [userId, influencerId, influencerId, "follower"])
                ]);
                
                return { message: "Follower added successfully" };
            } else {
                return { message: "Already following" };
            }
        } catch (error) {
            console.error('Error adding follower:', error);
            throw error;
        }
    }
    async getFollowing(userId: number) {
        try {
            const sql = `
            SELECT * FROM follower JOIN users ON users.id = follower.influencer_id WHERE follower_id = $1
            `;
            const result = await this.query(sql, [userId]);
            return result;
        } catch (error) {
            console.error('Error fetching following:', error);
            throw error; // Re-throw the error after logging
        }
    }
}
