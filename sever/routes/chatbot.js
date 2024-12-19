const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "your_fallback_api_key",
});

// Hàm retry khi gặp lỗi 429
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0 || error.response?.status !== 429) {
      throw error;
    }
    // Đợi một khoảng thời gian trước khi thử lại
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2); // Tăng độ trễ giữa các lần thử
  }
};

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required!" });
  }

  try {
    const response = await retryRequest(() =>
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      })
    );

    const answer = response.choices[0].message.content.trim();
    res.json({ success: true, reply: answer });
  } catch (error) {
    console.error("Error in chatbot:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Error in processing your request" });
  }
});

module.exports = router;
