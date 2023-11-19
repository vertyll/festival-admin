import mongoose, { model, Schema, models } from "mongoose";

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String], required: false },
    description: String,
    scene: { type: mongoose.Types.ObjectId, ref: "Scene" },
    concertDate: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

export const Artist = models?.Artist || model("Artist", ArtistSchema);
