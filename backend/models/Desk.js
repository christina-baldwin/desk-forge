import mongoose from "mongoose";

const deskSchema = new mongoose.Schema({
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
  suggestions: [{ type: String }],
});

const Desk = mongoose.model("Desk", deskSchema);

export default Desk;
