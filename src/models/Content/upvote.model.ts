import BaseModel from "../base.model";

class UpvoteModel extends BaseModel {
    constructor() {
        super();
    }


    async upvotePost(postId: number, userId: number) {
        const sql = `
            INSERT INTO upvote (post_id, user_id, type) 
            VALUES ($1, $2, 'post')
            ON CONFLICT (post_id, user_id, type) DO NOTHING
        `;
        return await this.query(sql, [postId, userId]);
    }

    async increaseUpvoteInPost(postId: number) {
        const sql = `UPDATE post SET upvote_count = upvote_count + 1 WHERE id = $1`;
        return await this.query(sql, [postId]);
    }

    async getUpvotesOfPost(postId: number) {
        const sql = `SELECT * FROM upvote WHERE post_id = $1`;
        return await this.query(sql, [postId]);
    }

    async sendNotificationToPostOwner(postId: number,senderId: number) {
        const sql1 = `SELECT user_id FROM post WHERE id = $1`;
        const result1 = await this.query(sql1, [postId]);
        const sql2 = `INSERT INTO notification (sender_id,reciever_id, content_id, content_type) VALUES ($1, $2, $3, 'post')`;
        const result2 = await this.query(sql2, [senderId,result1[0].user_id, postId]);
        return result2;
    }

    async upvoteBlogs(blogId: number, userId: number) {
        const sql = `
            INSERT INTO upvote (post_id, user_id, type)
            VALUES ($1, $2, 'blog')
            ON CONFLICT (post_id, user_id, type) DO NOTHING
        `;
        return await this.query(sql, [blogId, userId]);
    }

    async increaseUpvoteInBlog(blogId: number) {
        const sql = `UPDATE blog SET upvote_count = upvote_count + 1 WHERE id = $1`;
        return await this.query(sql, [blogId]);
    }

    async getUpvotesOfBlog(blogId: number) {
        const sql = `SELECT * FROM upvote WHERE post_id = $1`;
        return await this.query(sql, [blogId]);
    }

    async sendNotificationToBlogOwner(blogId: number,senderId: number) {
        const sql1 = `SELECT poster_id FROM blog WHERE id = $1`;
        const result1 = await this.query(sql1, [blogId]);
        const sql2 = `INSERT INTO notification (sender_id,reciever_id, content_id, content_type) VALUES ($1, $2, $3, 'blog')`;
        const result2 = await this.query(sql2, [senderId,result1[0].poster_id, blogId]);
        return result2;
    }

    async upvoteVlog(vlogId: number, userId: number) {
        const sql = `
            INSERT INTO upvote (post_id, user_id, type)
            VALUES ($1, $2, 'vlog')
            ON CONFLICT (post_id, user_id, type) DO NOTHING
        `;
        return await this.query(sql, [vlogId, userId]);
    }

    async increaseUpvoteInVlog(vlogId: number) {
        const sql = `UPDATE \"Vlog\" SET upvote_count = upvote_count + 1 WHERE id = $1`;
        return await this.query(sql, [vlogId]);
    }

    async getUpvotesOfVlog(vlogId: number) {
        const sql = `SELECT * FROM upvote WHERE post_id = $1`;
        return await this.query(sql, [vlogId]);
    }

    async sendNotificationToVlogOwner(vlogId: number,senderId: number) {
        const sql1 = `SELECT uploader_id FROM \"Vlog\" WHERE id = $1`;
        const result1 = await this.query(sql1, [vlogId]);
        const sql2 = `INSERT INTO notification (sender_id,reciever_id, content_id, content_type) VALUES ($1, $2, $3, 'vlog')`;
        const result2 = await this.query(sql2, [senderId,result1[0].uploader_id, vlogId]);
        return result2;
    }
}

export default UpvoteModel;
