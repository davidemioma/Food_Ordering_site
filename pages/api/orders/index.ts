import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../util/dbConnect";
import Order from "../../../models/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const orders = await Order.find();

      if (!orders) return res.status(204).json({ message: "No Orders found." });

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (req.method === "POST") {
    const newOrder = await Order.create(req?.body);

    res.status(201).json(newOrder);
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
