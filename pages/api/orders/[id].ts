import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../util/dbConnect";
import Order from "../../../models/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req?.query;

  await dbConnect();

  if (req.method === "GET") {
    const order = await Order.findById(id).exec();

    if (!order)
      return res.status(204).json({ message: `Order ID ${id} not found.` });

    res.status(200).json(order);
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (req.method === "PUT") {
    try {
      const result = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
