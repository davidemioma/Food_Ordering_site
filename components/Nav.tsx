import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { cartSelector } from "../store/cart-slice";

const Nav = () => {
  const router = useRouter();

  const cart = useSelector(cartSelector);

  return (
    <header className="bg-[#d1411e] h-24 p-6 md:p-8 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
          <Image
            src="/assets/telephone.png"
            width={32}
            height={32}
            objectFit="contain"
          />
        </div>

        <div className="text-white">
          <p className="text-sm">ORDER NOW!</p>

          <p>012 345 678</p>
        </div>
      </div>

      <ul className="hidden md:inline-flex items-center space-x-5 lg:space-x-7 text-white text-sm">
        <li className="cursor-pointer" onClick={() => router.push("/")}>
          Homepage
        </li>

        <li className="cursor-pointer">Products</li>

        <li className="cursor-pointer">Menu</li>

        <div
          className="relative w-28 h-28 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/assets/logo.png" layout="fill" objectFit="contain" />
        </div>

        <li className="cursor-pointer">Events</li>

        <li className="cursor-pointer">Blogs</li>

        <li className="cursor-pointer">Contact</li>
      </ul>

      <button className="relative" onClick={() => router.push("/cart")}>
        {cart.length > 0 && (
          <div className="absolute flex items-center justify-center bg-white rounded-full -top-2 -right-2 w-4 h-4 text-sm text-[#d1411e] font-bold">
            {cart.length}
          </div>
        )}

        <div className="relative w-7 h-7">
          <Image src="/assets/cart.png" layout="fill" objectFit="contain" />
        </div>
      </button>
    </header>
  );
};

export default Nav;
