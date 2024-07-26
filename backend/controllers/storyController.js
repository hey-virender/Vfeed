import { verifyToken } from "../utils/tokenUtils.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js";

export const uploadStory = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const decoded = await verifyToken(token);
    if (!decoded)
      return res.status(400).json({ msg: "User not authenticated" });
    const userId = decoded.id;
    const user = await User.findOne({ _id: userId });

    if (!req.file) return res.status(403).json({ msg: "No file specified" });

    await Story.create({
      userId: user._id,
      imageUrl: req.file.path,
    });
    res.status(200).json({ msg: "Story uploaded successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const fetchStories = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(400).json({ msg: "User not authenticated" });
    }
    const userId = decoded.id;
    const user = await User.findById(userId).populate("following"); // Get the list of users followed by the logged-in user

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followedUserIds = user.following.map((user) => user._id); // Extract the IDs of the followed users
    const stories = await Story.find({
      userId: { $in: followedUserIds },
    }).populate("userId"); // Fetch stories of the followed users

    // Group stories by user
    const groupedStories = stories.reduce((acc, story) => {
      const userId = story.userId._id.toString();
      if (!acc[userId]) {
        acc[userId] = {
          user: story.userId,
          stories: [],
        };
      }
      acc[userId].stories.push(story);
      return acc;
    }, {});
    const groupedStoriesArray = Object.values(groupedStories);
   
    res.status(200).json(groupedStoriesArray);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};
