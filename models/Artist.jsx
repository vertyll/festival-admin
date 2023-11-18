import { model, Schema, models } from "mongoose";

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String], required: false },
    description: String,
    scene: { type: String, required: true },
    concertDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Artist = models?.Artist || model("Artist", ArtistSchema);
