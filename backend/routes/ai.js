import express from "express";
import Desk from "../models/Desk.js";
import authenticate from "../middlewares/auth.js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/desks/:id/generate", authenticate, async (req, res) => {
  const deskId = req.params.id;

  try {
    const desk = await Desk.findOne({ _id: deskId, userId: req.user.id });
    if (!desk)
      return res
        .status(404)
        .json({ success: false, message: "Desk not found" });

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Give me 5 suggestions to improve my hobby desk setup:",
            },
            { type: "image_url", image_url: { url: desk.imageUrl } },
          ],
        },
      ],
      max_tokens: 500,
    });

    const aiMessage = response.choices[0]?.message?.content || "";

    desk.suggestions = aiMessage.split("\n").filter((s) => s.trim() !== "");
    await desk.save();

    res.status(200).json({ success: true, suggestions: desk.suggestions });
  } catch (error) {
    console.error("Generate suggestions error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate suggestions" });
  }
});

export default router;
