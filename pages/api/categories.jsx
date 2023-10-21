import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parentCategory"));
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const newCategory = await Category.create({ name, parentCategory });
    res.json(newCategory);
  }

  if (method === "PUT") {
    const { name, parentCategory, _id } = req.body;
    const newCategory = await Category.updateOne(
      { _id },
      { name, parentCategory }
    );
    res.json(newCategory);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json(true);
  }
}
