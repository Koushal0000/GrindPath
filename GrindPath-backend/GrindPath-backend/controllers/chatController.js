const { askGemini } = require("../utils/gemini");

const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const answer = await askGemini(question);

    res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error("Chat Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
};

module.exports = { chatWithAI };