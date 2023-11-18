import { model, Schema, models } from "mongoose";

const AttributeSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Attribute = models?.Attribute || model("Attribute", AttributeSchema);
