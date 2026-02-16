import Qna from "../models/Qna.js";

/* ---------------------------------------------------
   ✅ Get All Questions
--------------------------------------------------- */
/* ---------------------------------------------------
   ✅ Get All Questions
--------------------------------------------------- */
export const getQuestions = async (req, res) => {
  try {
    const questions = await Qna.find()
      .populate("author", "username profileImg")
      .populate("answers.author", "username profileImg")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      questions: questions || [],
    });
  } catch (err) {
    console.error("❌ Error fetching questions:", err);
    return res.status(500).json({
      success: false,
      questions: [],
      message: "Unable to fetch questions at the moment.",
    });
  }
};

/* ---------------------------------------------------
   ✅ Post a New Question
--------------------------------------------------- */
export const addQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user._id;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid question.",
      });
    }

    const newQuestion = new Qna({ 
        question: question.trim(), 
        answers: [],
        author: userId
    });
    await newQuestion.save();
    
    // Repopulate to return full object
    await newQuestion.populate("author", "username profileImg");

    return res.status(201).json({
      success: true,
      question: newQuestion,
    });
  } catch (err) {
    console.error("❌ Error adding question:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while posting question.",
    });
  }
};

/* ---------------------------------------------------
   ✅ Add Answer to Question
--------------------------------------------------- */
export const addAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please write an answer.",
      });
    }

    const question = await Qna.findById(id);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    question.answers.push({ 
        text: text.trim(),
        author: userId
    });
    await question.save();

    // Re-fetch to populate everything for frontend consistency
    const updatedQuestion = await Qna.findById(id)
      .populate("author", "username profileImg")
      .populate("answers.author", "username profileImg");

    return res.status(201).json({
      success: true,
      question: updatedQuestion,
    });
  } catch (err) {
    console.error("❌ Error adding answer:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while adding answer.",
    });
  }
};

/* ---------------------------------------------------
   ✅ Delete Question
--------------------------------------------------- */
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const question = await Qna.findById(id);
    if (!question) {
        return res.status(404).json({ success: false, message: "Question not found." });
    }

    // Check ownership
    // If field doesn't exist (old questions), assume open or restrict?
    // Let's restrict to owner if field exists.
    if (question.author && question.author.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: "Not authorized to delete this question." });
    }

    await Qna.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Question deleted successfully.", questionId: id });
  } catch (err) {
    console.error("❌ Error deleting question:", err);
    return res.status(500).json({ success: false, message: "Unable to delete question." });
  }
};
