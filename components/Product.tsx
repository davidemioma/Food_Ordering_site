import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductProps } from "../types";

interface Props {
  product: ProductProps;
}

const Product = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="flex items-center justify-center w-full sm:w-1/2 lg:w-[22%] py-5 px-10 cursor-pointer hover:shadow-md">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={product.image}
            width="200"
            height="200"
            objectFit="contain"
          />

          <div className="text-center">
            <h2 className="text-lg mb-2 uppercase font-bold text-[#d1411e]">
              {product.title}
            </h2>

            <p className="font-semibold mb-1">
              ${product.prices[0].toFixed(2)}
            </p>

            <p className="text-sm text-[#777777]">{product.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
