import express from "express";
import { createReview, getReviews } from "../controllers/Review.controller.js";
import { protect } from "../middleware/protect.middlewares.js";

const router = express.Router();

router.post("/company-reviews", protect, createReview);
router.get("/company-reviews", getReviews);

export default router;
