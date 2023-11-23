import { model, Schema, models } from "mongoose";

const SponsorSchema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String] },
    link: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Sponsor = models?.Sponsor || model("Sponsor", SponsorSchema);
