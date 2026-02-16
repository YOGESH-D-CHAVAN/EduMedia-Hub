import express from "express";
import { createReview, getReviews, deleteReview } from "../controllers/Review.controller.js";
import { protect } from "../middleware/protect.middlewares.js";

const router = express.Router();

router.post("/company-reviews", protect, createReview);
router.get("/company-reviews", getReviews);
router.delete("/company-reviews/:id", protect, deleteReview);

export default router;
