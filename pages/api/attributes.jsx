import { Attribute } from "@/models/Attribute";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Attribute.find());
  }

  if (method === "POST") {
    const { name, values } = req.body;
    const newAttribute = await Attribute.create({
      name,
      values,
    });
    res.json(newAttribute);
  }

  if (method === "PUT") {
    const { name, values, _id } = req.body;
    const newAttribute = await Attribute.updateOne({ _id }, { name, values });
    res.json(newAttribute);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Attribute.deleteOne({ _id });
    res.json(true);
  }
}
