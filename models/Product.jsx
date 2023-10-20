import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  images: { type: [String] },
  description: String,
  price: { type: Number, required: true },
});

export const Product = models.Product || model("Product", ProductSchema);
