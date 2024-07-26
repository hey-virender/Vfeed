import express from "express";
import upload from "../config/multerConfig.js";
import { uploadStory, fetchStories } from "../controllers/storyController.js";

const router = express.Router();

router.post("/uploadStory", upload.single("file"), uploadStory);
router.get("/fetchStories", fetchStories);

export default router;
