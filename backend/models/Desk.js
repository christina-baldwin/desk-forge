import mongoose from "mongoose";

const deskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    problems: { type: String, default: "" },
    suggestions: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    summary: { type: String, default: "" },
  },
  { timestamps: true }
);

const Desk = mongoose.model("Desk", deskSchema);

export default Desk;
