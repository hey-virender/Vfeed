import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: { type: String, required: true },
    caption: { type: String, default: "" },
    duration: { type: Number, default: 10 },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now, expiresInSeconds: 86400 },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
