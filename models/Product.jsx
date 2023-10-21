import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category", required: false },
  images: { type: [String], required: false },
  description: { type: String, required: false },
  price: { type: Number, required: true },
});

export const Product = models?.Product || model("Product", ProductSchema);
