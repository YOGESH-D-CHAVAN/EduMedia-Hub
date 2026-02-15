import Review from "../models/Review.js";
import ApiError from "../utils/apiError.js";
import ApiResponce from "../utils/apiResponce.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Review
export const createReview = asyncHandler(async (req, res) => {
    const { company, role, location, overall, workLife, culture, salary, benefits, recommend, pros, cons, interview, logo } = req.body;

    if (!company || !role || !location || !pros || !cons) {
        throw new ApiError(400, "Please fill in all required fields.");
    }

    const newReview = await Review.create({
        company, role, location, logo,
        overall: Number(overall), workLife: Number(workLife), culture: Number(culture), salary: Number(salary), benefits: Number(benefits),
        recommend: Boolean(recommend),
        pros, cons, interview,
        author: req.user ? req.user._id : null
    });

    return res
        .status(201)
        .json(new ApiResponce(201, "Review posted successfully", newReview));
});

// Get Reviews
export const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find().sort({ createdAt: -1 }).populate("author", "username profileImg");

    return res
        .status(200)
        .json(new ApiResponce(200, "Reviews fetched successfully", reviews));
});
