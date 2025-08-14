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
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Use the uploaded image and the below desk problems, if available, to give 5 suggestions to improve my hobby desk setup, specifically for warhammer 40k, reference specific products if valid. Return them as a JSON array of objects, each with a 'title' and a 'description'. No markdown formatting, no asterisks.",
            },
            {
              type: "text",
              text: `Desk problems I'd like fixed: ${desk.problems}`,
            },
            { type: "image_url", image_url: { url: desk.imageUrl } },
          ],
        },
      ],
      max_tokens: 500,
    });

    const aiMessage = response.choices[0]?.message?.content || "";

    desk.suggestions = JSON.parse(aiMessage);

    const summaryPrompt = `Here are the desk problems ${
      desk.problems
    } and here are the ai-generated suggestions ${desk.suggestions
      .map((s) => `${s.title}: ${s.description}`)
      .join(
        "\n"
      )}. Using these, write a short 1 sentence summary highlighting only the key issues and solutions for my warhammer hobby desk setup`;

    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: summaryPrompt }],
      max_tokens: 150,
    });

    desk.summary = summaryResponse.choices[0]?.message?.content || "";

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
