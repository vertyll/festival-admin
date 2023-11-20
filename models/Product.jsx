import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    images: { type: [String] },
    description: { type: String },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Product = models?.Product || model("Product", ProductSchema);
