import BlogModel from "../../models/Content/blog.model";

class BlogService {
  private blogModel = new BlogModel();

  async getBlog(id: number) {
    try {
      return await this.blogModel.getBlog(id);
    } catch (error) {
      console.error(`Error getting blog with id ${id}:`, error);
      throw error;
    }
  }

  async createBlog(posterId: number, title: string, body: string) {
    try {
      return await this.blogModel.createBlog(posterId, title, body);
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  }

  async updateBlog(id: number, title: string, body: string) {
    try {
      return await this.blogModel.updateBlog(id, title, body);
    } catch (error) {
      console.error(`Error updating blog with id ${id}:`, error);
      throw error;
    }
  }
  async deleteBlog(id: number) {
    try {
      return await this.blogModel.deleteBlog(id);
    } catch (error) {
      console.error(`Error deleting blog with id ${id}:`, error);
      throw error;
    }
  }
  async getUserBlogs(userId : number){
    try {
      return await this.blogModel.getUserBlogs(userId);
    } catch (error) {
      console.error(`Error getting user blogs with id ${userId}:`, error);
      throw error;
    }
  }
}

export default BlogService;
