import { Router } from "express";

const router = Router();

import userRoutes from "./routes/Auth/user.routes";
import authRoutes from "./routes/Auth/auth.routes";

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.get("/", (req, res) => {
  res.send("Server is running!");
});

export default router;
