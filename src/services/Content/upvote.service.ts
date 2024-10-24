import UpvoteModel from "../../models/Content/upvote.model";

class UpvoteService {
    async upvotePost(postId: number, userId: number) {
        const upvoteModel = new UpvoteModel();
        await upvoteModel.upvotePost(postId, userId);
        await upvoteModel.increaseUpvoteInPost(postId);
        await upvoteModel.sendNotificationToPostOwner(postId,userId);
        return { message: "Upvoted post successfully" };
    }
    async upvoteBlog(blogId: number, userId: number) {
        const upvoteModel = new UpvoteModel();
        await upvoteModel.upvoteBlogs(blogId, userId);
        await upvoteModel.increaseUpvoteInBlog(blogId);
        await upvoteModel.sendNotificationToBlogOwner(blogId,userId);
        return { message: "Upvoted blog successfully" };
    }
    async upvoteVlog(vlogId: number, userId: number) {
        const upvoteModel = new UpvoteModel();
        await upvoteModel.upvoteVlog(vlogId, userId);
        await upvoteModel.increaseUpvoteInVlog(vlogId);
        await upvoteModel.sendNotificationToVlogOwner(vlogId,userId);
        return { message: "Upvoted vlog successfully" };
    }
}

export default UpvoteService;