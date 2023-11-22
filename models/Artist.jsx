import mongoose, { model, Schema, models } from "mongoose";

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String] },
    description: { type: String },
    stage: { type: mongoose.Types.ObjectId, ref: "Stage" },
    concertDate: { type: Date },
    concertTime: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Artist = models?.Artist || model("Artist", ArtistSchema);
