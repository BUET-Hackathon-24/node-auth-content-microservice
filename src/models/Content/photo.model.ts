import Base from "../base.model";

class PhotoModel extends Base {
    tableFields = ["id", "post_id", "name", "url", "created_at"];

    async getPhoto(id: number) {
        try {
            return await this.query("SELECT * FROM photo WHERE id = $1", [id]);
        } catch (error) {
            console.error("Database error in getPhoto:", error);
            throw new Error("Failed to retrieve photo");
        }
    }

    async createPhoto(postId: number, name: string, url: string) {
        try {
            return await this.query(
                "INSERT INTO photo (post_id, name, url) VALUES ($1, $2, $3) RETURNING *",
                [postId, name, url]
            );
        } catch (error) {
            console.error("Database error in createPhoto:", error);
            throw new Error("Failed to create photo");
        }
    }

    async updatePhoto(id: number, name: string, url: string) {
        try {
            return await this.query(
                "UPDATE photo SET name = $1, url = $2 WHERE id = $3 RETURNING *",
                [name, url, id]
            );
        } catch (error) {
            console.error("Database error in updatePhoto:", error);
            throw new Error("Failed to update photo");
        }
    }

    async deletePhoto(id: number) {
        try {
            return await this.query(
                "DELETE FROM photo WHERE id = $1 RETURNING *",
                [id]
            );
        } catch (error) {
            console.error("Database error in deletePhoto:", error);
            throw new Error("Failed to delete photo");
        }
    }
    async getPostPhotos(postId : number){
        try {
            return this.query("SELECT * FROM photo WHERE post_id = $1", [postId]);
        } catch (error) {
            console.error("Database error in getPostPhotos:", error);
            throw new Error("Failed to retrieve post photos");
        }
    }
}

export default PhotoModel;
