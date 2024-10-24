import BaseModel from "../base.model";

class PostModel extends BaseModel {
    tableFields = ["id", "caption", "location", "created_at","user_id"];
    async createPost(caption: string, location: string, userId: number, files: any,) {
        try {
            const sql = `
                WITH new_post AS (
                    INSERT INTO post (caption, location, user_id)
                    VALUES ($1, $2, $3)
                    RETURNING id
                )
                INSERT INTO "Photo" (post_id, name, url,description)
                SELECT new_post.id, unnest($4::text[]), unnest($5::text[]), unnest($6::text[])
                FROM new_post
                RETURNING (SELECT new_post.id FROM new_post), name, url,description;
            `;
            let result: any[] = [];
            if(files.length > 0){
                const fileNames = files.map((file: any) => file.name);
                const fileUrls = files.map((file: any) => file.url);
                const fileDescriptions = files.map((file: any) => file.description);
                result = await this.query(sql, [caption, location, userId, fileNames, fileUrls, fileDescriptions]);
            }
            
            return {
                id: result[0].id,
                caption,
                location,
                user_id: userId,
                photos: result.map((row: any) => ({ name: row.name, url: row.url }))
            };
        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Failed to create post');
        }
    }
    async getPostsOfUser(userId: number) {
        console.log("userId in getPostsOfUser: ", userId);
        try {
            const sql = `
                SELECT 
                    p.*,
                    COALESCE(
                        json_agg(
                            json_build_object('id', ph.id, 'name', ph.name, 'url', ph.url)
                        ) FILTER (WHERE ph.id IS NOT NULL),
                        '[]'
                    ) as photos
                FROM post p
                LEFT JOIN "Photo" ph ON p.id = ph.post_id
                WHERE p.user_id = $1
                GROUP BY p.id
                ORDER BY p.created_at DESC;
            `;
            const result = await this.query(sql, [userId]);
            return result;
        } catch (error) {
            console.error('Error getting posts of user:', error);
            throw new Error('Failed to get posts of user');
        }
    }
    async getPostByPosterId(userId: number) {
        const sql = `SELECT id FROM post WHERE user_id = $1`;
        const result = await this.query(sql, [userId]);
        return result[0].id;
    }
}

export default PostModel;
