import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../util/dbConnect";
import Product from "../../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { method, cookies } = req;

  const token = cookies.token;

  if (method === "GET") {
    try {
      const products = await Product.find();

      if (!products)
        return res.status(204).json({ message: "No products found." });

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated");
    }

    try {
      const newProduct = await Product.create(req?.body);

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
