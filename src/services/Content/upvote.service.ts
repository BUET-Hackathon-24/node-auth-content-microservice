import UpvoteModel from "../../models/Content/upvote.model";

class UpvoteService {
    static upvoteModel = new UpvoteModel();
    static async upvotePost(postId: number, userId: number) {
        await this.upvoteModel.upvotePost(postId, userId);
        await this.upvoteModel.increaseUpvoteInPost(postId);
        await this.upvoteModel.sendNotificationToPostOwner(postId,userId);
        console.log("Upvoted post successfully");
        return { message: "Upvoted post successfully" };
    }
    static async upvoteBlog(blogId: number, userId: number) {
        await this.upvoteModel.upvoteBlogs(blogId, userId);
        await this.upvoteModel.increaseUpvoteInBlog(blogId);
        await this.upvoteModel.sendNotificationToBlogOwner(blogId,userId);
        console.log("Upvoted blog successfully");
        return { message: "Upvoted blog successfully" };
    }
    static async upvoteVlog(vlogId: number, userId: number) {
        await this.upvoteModel.upvoteVlog(vlogId, userId);
        await this.upvoteModel.increaseUpvoteInVlog(vlogId);
        await this.upvoteModel.sendNotificationToVlogOwner(vlogId,userId);
        console.log("Upvoted vlog successfully");
        return { message: "Upvoted vlog successfully" };
    }
}

export default UpvoteService;