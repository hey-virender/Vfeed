import express from "express";
import { searchedProfile } from "../controllers/searchController.js";

const router = express.Router();

router.post("/searchedProfile", searchedProfile);

export default router;
