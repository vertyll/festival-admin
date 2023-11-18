import { Artist } from "@/models/Artist";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Artist.findOne({ _id: req.query.id }));
    } else {
      res.json(await Artist.find());
    }
  }

  if (method === "POST") {
    const { name, images, description, scene, concertDate } = req.body;
    const newArtist = await Artist.create({
      name,
      images,
      description,
      scene,
      concertDate,
    });
    res.json(newArtist);
  }

  if (method === "PUT") {
    const { name, images, description, scene, concertDate, _id } =
      req.body;
    await Artist.updateOne(
      { _id },
      {
        name,
        images,
        description,
        scene,
        concertDate,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Artist.deleteOne({ _id });
    res.json(true);
  }
}
