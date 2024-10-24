import BaseModel from "../base.model";

class UpvoteModel extends BaseModel {
    constructor() {
        super();
    }
    async upvotePost(postId: number, userId: number) {
        const sql = `INSERT INTO upvote (post_id, user_id,type) VALUES ($1, $2, 'post')`;
        return await this.query(sql, [postId, userId]);
    }
    async increaseUpvoteInPost(postId: number) {
        const sql = `UPDATE posts SET upvotes = upvotes + 1 WHERE id = $1`;
        return await this.query(sql, [postId]);
    }
    async getUpvotesOfPost(postId: number) {
        const sql = `SELECT * FROM upvote WHERE post_id = $1`;
        return await this.query(sql, [postId]);
    }
    async sendNotificationToPostOwner(postId: number,senderId: number,recreiverId: number) {
        
        const sql = `INSERT INTO notification (sender_id,receiver_id, content_id, type) VALUES ($1, $2, $3, 'upvote')`;
        return await this.query(sql, [senderId,recreiverId, postId]);
    }
}

export default UpvoteModel;