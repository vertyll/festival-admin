import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { name, category, images, description, price } = req.body;
    const newProduct = await Product.create({
      name,
      category,
      images,
      description,
      price,
    });
    res.json(newProduct);
  }

  if (method === "PUT") {
    const { name, category, images, description, price, _id } = req.body;
    await Product.updateOne({ _id }, { name, category, images, description, price });
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Product.deleteOne({ _id });
    res.json(true);
  }
}
