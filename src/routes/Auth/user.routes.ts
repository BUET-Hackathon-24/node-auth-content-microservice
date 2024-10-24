import UserController from "../../controllers/Auth/user.controller";
import AuthenticationMiddleware from "../../middlewares/authenticate";
import ApiCache from "../../middlewares/apicache";

import { Router } from "express";

const userRoutes = Router();
const userController = new UserController();
const authMiddleware = new AuthenticationMiddleware();


userRoutes.post("/", userController.createUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/", authMiddleware.authenticateUser, ApiCache.getCache("2 minutes"), userController.getUserById);
userRoutes.get("/email/:email", userController.getUserByEmail);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout/:id", userController.logout);
userRoutes.post("/refresh", userController.refresh);
userRoutes.post("/send-otp", userController.sendOtp);
userRoutes.post("/verify-otp", userController.verifyOtp);
userRoutes.patch("/forgot-password", userController.forgotPassword);
userRoutes.patch("/bio", authMiddleware.authenticateUser, userController.updateUserBio);


export default userRoutes;
