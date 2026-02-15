import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
    {
        company: { type: String, required: true },
        logo: { type: String },
        role: { type: String, required: true },
        location: { type: String, required: true },
        overall: { type: Number, required: true, min: 1, max: 5 },
        workLife: { type: Number, required: true, min: 1, max: 5 },
        culture: { type: Number, required: true, min: 1, max: 5 },
        salary: { type: Number, required: true, min: 1, max: 5 },
        benefits: { type: Number, required: true, min: 1, max: 5 },
        recommend: { type: Boolean, required: true },
        pros: { type: String, required: true },
        cons: { type: String, required: true },
        interview: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
