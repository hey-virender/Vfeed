// routes/postRoutes.js

import express from "express";
import upload from "../config/multerConfig.js";
const router = express.Router();
import { verifyToken } from "../utils/tokenUtils.js";
import Post from "../models/post.model.js";
import { createPost } from "../controllers/postController.js";



router.get("/all", async (req, res) => {
  const userId = req.cookies.user_id; // Assume user ID is available in the request
  const posts = await Post.find().populate("author").lean();

  const postsWithLikes = posts.map((post) => {
    const isLiked = post?.likes.some(
      (like) => like.toString() === userId.toString()
    );
    return {
      ...post,
      isLiked,
    };
  });

  res.json(postsWithLikes);
});

router.get("/myposts", async (req, res) => {
  const token = req.cookies.access_token;
  if (token) {
    const user = await verifyToken(token);
    const posts = await Post.find({ author: user.id }).populate("author");
    res.send(posts);
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

router.post("/createPost", upload.single("file"), createPost);

router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Delete file from file system using fs module or delete the path field from the database

    await post.remove();

    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
