import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const searchUsers = async (username, currentUserId) => {
  if (!username) return [];

  const regex = new RegExp(`^${username}`, "i");

  const users = await User.find({
    username: { $regex: regex },
    _id: { $ne: currentUserId },
  });

  return users;
};

export const searchedProfile = async (req, res) => {
  const token = req.cookies.access_token;
  const decoded = await verifyToken(token);
  const userId = decoded?.id;
  const { username } = req.body;
  const user = await User.findOne({ username });
  const data = await Post.find({ author: user._id }).populate("author").lean();
  const posts = data.map((post) => {
    const isLiked = post?.likes.some(
      (like) => like.toString() === userId.toString()
    );
    return {
      ...post,
      isLiked,
    };
  });
  const response = {
    user,
    posts,
  };
  res.send(response);
};
