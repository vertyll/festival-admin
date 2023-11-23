import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Sponsor } from "@/models/Sponsor";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Sponsor.findOne({ _id: req.query.id }));
    } else {
      res.json(await Sponsor.find());
    }
  }

  if (method === "POST") {
    const { name, images, link } = req.body;
    const newSponsor = await Sponsor.create({
      name,
      images,
      link,
    });
    res.json(newSponsor);
  }

  if (method === "PUT") {
    const { name, images, link, _id} = req.body;
    await Sponsor.updateOne(
      { _id },
      {
        name,
        images,
        link,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Sponsor.deleteOne({ _id });
    res.json(true);
  }
}
