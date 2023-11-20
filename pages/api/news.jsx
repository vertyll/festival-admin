import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { News } from "@/models/News";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await News.findOne({ _id: req.query.id }));
    } else {
      res.json(await News.find());
    }
  }

  if (method === "POST") {
    const { name, images, description } = req.body;
    const newNews = await News.create({
      name,
      images,
      description,
    });
    res.json(newNews);
  }

  if (method === "PUT") {
    const { name, images, description, _id } = req.body;
    await News.updateOne(
      { _id },
      {
        name,
        images,
        description,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await News.deleteOne({ _id });
    res.json(true);
  }
}
