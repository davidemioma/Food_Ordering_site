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
      const product = await Product.findById(req?.query?.id).exec();

      if (!product)
        return res.status(204).json({ message: "product not found." });

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated");
    }

    try {
      const product = await Product.findOne({ _id: req?.query?.id }).exec();

      if (!product)
        return res
          .status(204)
          .json({ message: `Product ID ${req?.query?.id} not found.` });

      const result = await Product.deleteOne({ _id: req?.query?.id });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
