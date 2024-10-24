import { Router } from "express";

const router = Router();

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.get("/", (req, res) => {
  res.send("Server is running!");
});

export default router;
