import { Stage } from "@/models/Stage";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Stage.find());
  }

  if (method === "POST") {
    const { name } = req.body;
    const newStage = await Stage.create({
      name,
    });
    res.json(newStage);
  }

  if (method === "PUT") {
    const { name, _id } = req.body;
    const newStage = await Stage.updateOne({ _id }, { name });
    res.json(newStage);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Stage.deleteOne({ _id });
    res.json(true);
  }
}
