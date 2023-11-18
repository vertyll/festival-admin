import { model, Schema, models } from "mongoose";

const SceneSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Scene = models?.Scene || model("Scene", SceneSchema);
