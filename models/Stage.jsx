import { model, Schema, models } from "mongoose";

const StageSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Stage = models?.Stage || model("Stage", StageSchema);
