import express from "express";
import {
  createPost,
  getStudentFeed,
  toggleLike,
  addComment,
  deletePost
} from "../controllers/Post.controllers.js";
import { protect } from "../middleware/protect.middlewares.js";
import upload from "../middleware/Upload.middleware.js";

const router = express.Router();

router.post("/post", protect, upload.array("media", 5), createPost);
router.delete("/post/:id", protect, deletePost);

// Student feed
router.get("/feed" , protect , getStudentFeed);

// Like & Comment
router.post("/:postId/like", protect, toggleLike);
router.post("/:postId/comment", protect , addComment);

export default router;
