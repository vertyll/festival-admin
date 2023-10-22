import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Admin } from "@/models/Admin";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Admin.find());
  }

  if (method === "POST") {
    const { email } = req.body;
    const newAdmin = await Admin.create({
      email,
    });
    res.json(newAdmin);
  }

  if (method === "PUT") {
    const { email, _id } = req.body;
    const newAdmin = await Admin.updateOne({ _id }, { email });
    res.json(newAdmin);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Admin.deleteOne({ _id });
    res.json(true);
  }
}
