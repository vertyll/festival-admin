import mongoose, { model, Schema, models } from "mongoose";

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String] },
    description: { type: String },
    scene: { type: mongoose.Types.ObjectId, ref: "Scene", required: true },
    concertDate: { type: Date, required: true },
    concertTime: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Artist = models?.Artist || model("Artist", ArtistSchema);
