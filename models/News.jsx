import mongoose, { model, Schema, models } from "mongoose";

const NewsSchema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String], required: false },
    description: String,
  },
  {
    timestamps: true,
  }
);

export const News = models?.News || model("News", NewsSchema);
