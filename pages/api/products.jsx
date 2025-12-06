import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { name, category, properties, combinations, images, description, price, availability } = req.body;
    const isValidCategory = category && category.trim() !== "";
    const newProduct = await Product.create({
      name,
      category: isValidCategory ? category : null,
      properties,
      combinations,
      images,
      description,
      price,
      availability,
    });
    res.json(newProduct);
  }

  if (method === "PUT") {
    const { name, category, properties, combinations, images, description, price, availability, _id } = req.body;
    const isValidCategory = category && category.trim() !== "";

    const hasProperties = properties && properties.length > 0;

    let updateData = {
      name,
      category: isValidCategory ? category : null,
      properties,
      combinations,
      images,
      description,
      price,
    };

    let updateOptions = {};

    if (!hasProperties) {
      updateData.availability = availability;
    } else {
      // Używanie $unset, aby usunąć pole availability
      updateOptions.$unset = { availability: 1 };
    }

    await Product.updateOne({ _id }, { $set: updateData, ...updateOptions });
    res.json(true);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Product.deleteOne({ _id });
    res.json(true);
  }
}
