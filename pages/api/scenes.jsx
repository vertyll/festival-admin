import { Scene } from "@/models/Scene";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Scene.find());
  }

  if (method === "POST") {
    const { name } = req.body;
    const newScene = await Scene.create({
      name,
    });
    res.json(newScene);
  }

  if (method === "PUT") {
    const { name, _id } = req.body;
    const newScene = await Scene.updateOne({ _id }, { name });
    res.json(newScene);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Scene.deleteOne({ _id });
    res.json(true);
  }
}
