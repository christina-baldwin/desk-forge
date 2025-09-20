import express from "express";
import Desk from "../models/Desk.js";
import User from "../models/User.js";
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
    // fetch the desk
    const desk = await Desk.findOne({ _id: deskId, userId: req.user.id });
    if (!desk)
      return res
        .status(404)
        .json({ success: false, message: "Desk not found" });

    // fetch the user
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // limit AI calls per account
    if ((user.totalAiCalls || 0) >= 10) {
      return res.status(403).json({
        success: false,
        message:
          "You’ve reached your AI call limit. Please contact me for more access.",
      });
    }

    // ask openai for suggestions
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Use the uploaded image and the below desk problems, if available, to give 5 suggestions to improve my hobby desk setup, specifically for warhammer 40k. Reference specific products if applicable. Reference specific points on the desk where your suggested items would be placed. For each suggestion, provide coordinates using x and y to visually represent where that specific suggestion should be placed assuming x will always be a maximum value of 440px and y being 267px. Reference things on the desk that are not useful and can be removed. Return them as a JSON array of objects, each with a 'title', 'description', 'x' and 'y'. No markdown formatting, no asterisks.",
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

    // ai returns an object so extract ai output from api response
    const aiMessage = response.choices[0]?.message?.content || "";

    console.info("aiMessage: ", aiMessage);

    // store ai suggestions
    desk.suggestions = JSON.parse(aiMessage);

    // generate a short summary, similar to previous prompt
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

    // increment ai calls
    user.totalAiCalls = (user.totalAiCalls || 0) + 1;
    await user.save();

    // save to database
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
