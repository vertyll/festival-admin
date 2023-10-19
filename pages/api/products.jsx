import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Product.find());
    }

    if (method === 'POST') {
        const {name, description, price} = req.body;
        const newProduct =  await Product.create({
            name, description, price,
        });
        res.json(newProduct);
    }
}