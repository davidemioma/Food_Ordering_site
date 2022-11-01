import React from "react";
import Image from "next/image";
import { CartItem } from "../types";

interface Props {
  items: CartItem[];
}

const CartItems = ({ items }: Props) => {
  return (
    <div className="w-full space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center space-x-2">
          <div className="relative w-20 h-20">
            <Image src={item.image} layout="fill" objectFit="contain" />
          </div>

          <div className="text-sm">
            <p className="text-[#d1411e] text-base font-bold">{item.title}</p>

            <p>{item.description}</p>

            <p className="font-bold">${item.price.toFixed(2)}</p>

            <p>Quantity: {item.quantity}</p>

            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
