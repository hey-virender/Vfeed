import User from "../models/user.model.js";

export const getFollowStatus = async (searchedId, userId) => {
  const user = await User.findById(userId);
  const searchedUser = await User.findById(searchedId);
  return (
    user.following.includes(searchedId) &&
    searchedUser.followers.includes(userId)
  );
};

export const changeFollowStatus = async (searchedId, userId) => {
  const user = await User.findById(userId);
  const searchedUser = await User.findById(searchedId);
  if (
    user.following.includes(searchedId) &&
    searchedUser.followers.includes(userId)
  ) {
    user.following = user.following.filter(
      (id) => id.toString() !== searchedId.toString()
    );
  } else {
    user.following.push(searchedId);
    searchedUser.followers.push(userId);
  }
  await user.save();
  await searchedUser.save();
  return (
    user.following.includes(searchedId) &&
    searchedUser.followers.includes(userId)
  );
};

export const getFollowers = async (userId) => {
  const user = await User.findById(userId).populate("followers");
  return user.followers;
};

export const getFollowing = async (userId) => {
  const user = await User.findById(userId).populate("following");
  return user.following;
};
