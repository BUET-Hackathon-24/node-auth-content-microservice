import UpvoteModel from "../../models/Content/upvote.model";

class UpvoteService {
    async upvotePost(postId: number, userId: number) {
        const upvoteModel = new UpvoteModel();
        await upvoteModel.upvotePost(postId, userId);
        await upvoteModel.increaseUpvoteInPost(postId);
        return { message: "Upvoted post successfully" };
    }
}

export default UpvoteService;