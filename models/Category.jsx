import mongoose, { model, Schema, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "Category",
  },
});

export const Category = models?.Category || model("Category", CategorySchema);
