import express from "express";
import upload from "../config/multerConfig.js";
import {
  registerUser,
  loginUser,
  logout,
  profile,
  editProfile,
  changeProfilePicture,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/profile", profile);
router.put("/editProfile", editProfile);
router.post(
  "/changeProfilePicture",
  upload.single("file"),
  changeProfilePicture
);
export default router;
