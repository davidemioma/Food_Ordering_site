import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Featured from "../components/Featured";
import { ProductProps } from "../types";
import Product from "../components/Product";
import AddProduct from "../components/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { addproductSelector } from "../store/modal-slice";
import { setAddProduct } from "../store/store";

interface Props {
  products: ProductProps[];
  admin: boolean;
}

const Home = ({ products, admin }: Props) => {
  const dispatch = useDispatch();

  const addAProduct = useSelector(addproductSelector);

  return (
    <div>
      <Head>
        <title>Pizza Restaurant</title>

        <meta name="description" content="Best pizza shop in town" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />

      {admin && (
        <button
          onClick={() => dispatch(setAddProduct(true))}
          className="bg-[#d1411e] my-5 ml-5 text-white text-center font-medium py-1 px-4 rounded-lg"
        >
          Add New product
        </button>
      )}

      <div className="w-screen flex flex-col items-center px-6 md:px-8 py-6">
        <h1 className="text-2xl text-center font-bold mb-6">
          THE BEST PIZZA IN TOWN
        </h1>

        <p className="w-[90%] sm:w-[70%] leading-6 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
          arcu in pretium molestie. Interdum et malesuada fames acme. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="w-full flex items-center justify-center flex-wrap">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>

      {addAProduct && <AddProduct />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const products = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  ).then((res) => res.json());

  return {
    props: {
      products,
      admin,
    },
  };
};

export default Home;
