import PostModel from "../../models/Content/post.model";

class PostService {
    postModel = new PostModel();

    async createPost(caption: string, location: string, userId: number, files: {name: string, url: string}[]) {
        try {
            return await this.postModel.createPost(caption, location, userId, files);
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post");
        }
    }

    async getPostsOfUser(userId: number) {
        try {
            return await this.postModel.getPostsOfUser(userId);
        } catch (error) {
            console.error(`Error getting posts of user with id ${userId}:`, error);
            throw error;
        }
    }
}

export default PostService;
