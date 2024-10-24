import BaseModel from "../base.model";

class PostModel extends BaseModel {
    tableFields = ["id", "caption", "location", "created_at","user_id"];
    async createPost(caption: string, location: string, userId: number, files: any) {
        try {
            console.log(files);
            files = JSON.parse(files);
            const sql = `
                WITH new_post AS (
                    INSERT INTO post (caption, location, user_id)
                    VALUES ($1, $2, $3)
                    RETURNING id
                )
                INSERT INTO "Photo" (post_id, name, url)
                SELECT new_post.id, unnest($4::text[]), unnest($5::text[])
                FROM new_post
                RETURNING (SELECT new_post.id FROM new_post), name, url;
            `;
            let result: any[] = [];
            if(files.length > 0){
                const fileNames = files.map((file: any) => file.name);
                const fileUrls = files.map((file: any) => file.url);
                result = await this.query(sql, [caption, location, userId, fileNames, fileUrls]);
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
        const sql = `
        SELECT * FROM post WHERE user_id = $1
        LEFT JOIN "Photo" ON post.id = "Photo".post_id
        `;
        const result = await this.query(sql, [userId]);
        return result;
    }
}

export default PostModel;
