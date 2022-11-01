import React from "react";
import Image from "next/image";
import { CartItem } from "../types";

interface Props {
  items: CartItem[];
}

const Table = ({ items }: Props) => {
  return (
    <table className="w-full">
      <tbody>
        <tr className="text-sm">
          <th>Product</th>

          <th>Name</th>

          <th>Extras</th>

          <th>Price</th>

          <th>Quantity</th>

          <th>Total</th>
        </tr>

        {items?.map((item, i) => (
          <tr className="text-xs sm:text-sm" key={i}>
            <td className="flex items-center justify-center py-3">
              <div className="relative w-14 h-14 md:h-20 md:w-20">
                <Image src={item.image} layout="fill" objectFit="contain" />
              </div>
            </td>

            <td className="text-center py-3">
              <span className="text-[#d1411e] font-bold ">{item.title}</span>
            </td>

            <td className="text-center py-3">
              {item.extras.length > 0 ? (
                <div className="truncate max-w-[90px] sm:max-w-[120px] mx-auto">
                  {item.extras.map((extra, i) => (
                    <p key={extra._id}>
                      {extra.text}
                      {i === item.extras.length - 1 ? "." : ","}
                    </p>
                  ))}
                </div>
              ) : (
                <p>N/A</p>
              )}
            </td>

            <td className="text-center py-3">
              <span>${item.price.toFixed(2)}</span>
            </td>

            <td className="text-center py-3">
              <span>{item.quantity}</span>
            </td>

            <td className="text-center py-3">
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
