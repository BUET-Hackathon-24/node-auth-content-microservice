import { Router } from "express";
import FollowerController from "../../controllers/Content/follower.controller";
import AuthenticationMiddleware from "../../middlewares/authenticate";
import ApiCache from "../../middlewares/apicache";

const router = Router();
const followerController = new FollowerController();
const authenticationMiddleware = new AuthenticationMiddleware();
// Route to get followers
router.get('/followers', authenticationMiddleware.authenticateUser, ApiCache.getCache("2 minutes"), (req, res) => followerController.getFollowers(req, res));

// Route to add a follower
router.post('/followers/add', authenticationMiddleware.authenticateUser, (req, res) => followerController.addFollower(req, res));

// Route to get following
router.get('/following', authenticationMiddleware.authenticateUser, ApiCache.getCache("2 minutes"), (req, res) => followerController.getFollowing(req, res));

export default router;

