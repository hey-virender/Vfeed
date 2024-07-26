import User from "../models/user.model.js";
import { generateHash, compareHash } from "../utils/hashUtils.js";
import { generateToken, verifyToken } from "../utils/tokenUtils.js";

const validateUsername = (input) => {
  const trimmedInput = input.trim();

  const lowercaseUsername = trimmedInput.toLowerCase();

  const formattedUsername = lowercaseUsername.replace(/\s+/g, "_");

  const sanitizedUsername = formattedUsername.replace(/[^\w]/g, "");

  return sanitizedUsername;
};

const registerUser = async (req, res) => {
  const { name, username, email, password, confirmPass } = req.body;

  const hash = await generateHash(password);

  if (!username || !password || !email || !name || !confirmPass) {
    return res
      .status(400)
      .json({ msg: "Please provide username, password, and email" });
  }
  if (password !== confirmPass) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }
  try {
    const userExist = await User.findOne({ username: username });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const filteredUserName = await validateUsername(username);
      const user = await User.create({
        name,
        username: filteredUserName,
        password: hash,
        email,
      });
      const token = generateToken(user);
      res.cookie("access_token", token);
      res.cookie("username", user.username);
      res.cookie("user_id", user._id);
      res.status(200).json({ msg: "User created successfully" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(403)
      .json({ msg: "Please provide username and password" });
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(403).json({ msg: "User does not exist" });
  }

  const isMatch = await compareHash(password, user.password);
  if (!isMatch) {
    return res.status(403).json({ msg: "Invalid credentials" });
  } else {
    const token = generateToken(user);
    res.cookie("access_token", token);
    res.cookie("username", user.username);
    res.cookie("user_id", user._id);
    res.status(200).json({ msg: "User logged in successfully" });
  }
};



const logout = async (req, res) => {
  try {
    res.cookie("access_token", "");
    res.cookie("username", "");
    res.cookie("user_id", "");
    res.status(200).json({ msg: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const profile = async (req, res) => {
  const token = req.cookies.access_token;
  const decoded = await verifyToken(token);
  const user = await User.findOne({ username: decoded.username });
  res.send(user);
};

const editProfile = async (req, res) => {
  const { name, email, username, password } = req.body;

  const userId = req.cookies.user_id;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const hash = await compareHash(password, user.password);
  if (!hash) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (username) updateFields.username = username;

  try {
    await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    res.status(200).json({ msg: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const changeProfilePicture = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    const decoded = await verifyToken(token);
    if (!decoded) return res.status(403).json({ err: "Not authorized" });
    await User.findOneAndUpdate(
      { username: decoded.username },
      { $set: { profilePicture: req.file.path } }
    );
    res.status(200).json({ msg: "Profile picture updated successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export { registerUser, loginUser, logout, profile, editProfile };
