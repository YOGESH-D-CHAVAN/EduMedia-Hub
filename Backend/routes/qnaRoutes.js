import express from "express";
import { getQuestions, addQuestion, addAnswer, deleteQuestion } from "../controllers/qnaController.js";
import { protect } from "../middleware/protect.middlewares.js";

const router = express.Router();

router.get("/getQuestions", getQuestions);
router.post("/", protect, addQuestion);
router.post("/:id/answer", protect, addAnswer);
router.delete("/:id", protect, deleteQuestion);



export default router;
