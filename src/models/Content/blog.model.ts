import Base from "../base.model";

class BlogModel extends Base {
  tableFields = ["id", "poster_id", "title", "body", "created_at", "upvotes"];

  async getBlog(id: number) {
    try {
      return await this.query("SELECT * FROM blog WHERE id = $1", [id]);
    } catch (error) {
      console.error("Database error in getBlog:", error);
      throw new Error("Failed to retrieve blog");
    }
  }

  async createBlog(posterId: number, title: string, body: string) {
    try {
      return await this.query(
        "INSERT INTO blog (poster_id, title, body) VALUES ($1, $2, $3) RETURNING *",
        [posterId, title, body]
      );
    } catch (error) {
      console.error("Database error in createBlog:", error);
      throw new Error("Failed to create blog");
    }
  }

  async updateBlog(id: number, title: string, body: string) {
    try {
      return await this.query(
        "UPDATE blog SET title = $1, body = $2 WHERE id = $3 RETURNING *",
        [title, body, id]
      );
    } catch (error) {
      console.error("Database error in updateBlog:", error);
      throw new Error("Failed to update blog");
    }
  }

  async deleteBlog(id: number) {
    try {
      return await this.query(
        "DELETE FROM blog WHERE id = $1 RETURNING *",
        [id]
      );
    } catch (error) {
      console.error("Database error in deleteBlog:", error);
      throw new Error("Failed to delete blog");
    }
  }
  getUserBlogs(userId : number){
    try {
      console.log("userId in model: ", userId);
      return this.query(
        "SELECT * FROM blog JOIN users ON users.id = blog.poster_id WHERE blog.poster_id = $1",
        [userId]
      );
    } catch (error) {
      console.error("Database error in getUserblog:", error);
      throw new Error("Failed to retrieve user blog");
    }
  }
}

export default BlogModel;
