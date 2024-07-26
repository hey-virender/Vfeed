import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const createPost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (token) {
      const user = await verifyToken(token);

      if (!req.file) {
        return res.status(400).json({ msg: "Please upload a file" });
      }

      await Post.create({
        imageUrl: req.file.path,
        caption: req.body.caption,
        author: user.id,
      });

      res.status(200).json({ msg: "Post created successfully" });
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getLikeStatus = async (token, postId) => {
  const decoded = await verifyToken(token);
  if (!decoded) return res.status(401).json({ msg: "Not authorized" });
  const userId = decoded.id;
  const post = await Post.findById(postId);
  const likeStatus = post?.likes.some(
    (like) => like.toString() === userId.toString()
  );
  return likeStatus;
};

export const likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  const user = await User.findById(userId);
  const userIdStr = user._id.toString();

  if (post.likes.some((id) => id.toString() === userIdStr)) {
    post.likes = post.likes.filter((id) => id.toString() !== userIdStr);
  } else {
    post.likes.push(user._id);
  }
  await post.save();
  const isLiked = post.likes.some((id) => id.toString() === userIdStr);
  const likeDetails = {
    likes: post.likes.length,
    isLiked: isLiked,
  };
  return likeDetails;
};

export const addComment = async (postId, userId, commentText) => {
  const post = await Post.findById(postId).populate("comments");
  const newComment = {
    text: commentText,
    user: userId,
    createdAt: new Date(),
  };
  post.comments.push(newComment);
  await post.save();
};

export const getComments = async (postId) => {
  const post = await Post.findById(postId).populate("comments.user");
  const data = {
    postId: postId,
    comments: post.comments,
  };
  return data;
};
