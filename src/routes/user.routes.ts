import UserController from "../controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.createUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/email/:email", userController.getUserByEmail);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout/:id", userController.logout);
userRoutes.post("/refresh", userController.refresh);
userRoutes.post("/send-otp", userController.sendOtp);
userRoutes.post("/verify-otp", userController.verifyOtp);
userRoutes.patch("/forgot-password", userController.forgotPassword);


export default userRoutes;
