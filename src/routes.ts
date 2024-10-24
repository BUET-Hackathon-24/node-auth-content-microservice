import { Router } from "express";

const router = Router();

import userRoutes from "./routes/Auth/user.routes";
import authRoutes from "./routes/Auth/auth.routes";
import blogRoutes from "./routes/Content/blog.routes";
import photoRoutes from "./routes/Content/photo.routes";
import planRoutes from "./routes/Content/plan.routes";
import vlogRoutes from "./routes/Content/vlog.routes";
import postRoutes from "./routes/Content/post.routes";

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/photos", photoRoutes);
router.use("/plans", planRoutes);
router.use("/vlogs", vlogRoutes);
router.use("/posts", postRoutes);
router.get("/", (req, res) => {
  res.send("Server is running!");
});

export default router;
