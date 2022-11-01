import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ProductProps, OrderProps } from "../../types";
import axios from "axios";

interface Props {
  products: ProductProps[];
  orders: OrderProps[];
}

const Admin = ({ products, orders }: Props) => {
  const [productsList, setProductList] = useState(products);

  const [orderList, setOrderList] = useState(orders);

  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id: string) => {
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`)
        .then(() =>
          setProductList((prev) => prev.filter((item) => item._id !== id))
        );
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id: string) => {
    const currentStatus = orderList.find((item) => item._id === id)?.status;

    try {
      await axios
        .put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`, {
          status: currentStatus ? currentStatus + 1 : 0,
        })
        .then((res) =>
          setOrderList((prev) => [
            res?.data,
            ...prev.filter((item) => item._id !== id),
          ])
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Admin - Pizza Restaurant</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen px-4 md:px-8 py-10 lg:flex lg:justify-between">
        <div className="w-full mb-10 lg:mb-0">
          <h1 className="text-3xl font-bold mb-5">Products</h1>

          <table className="w-full">
            <tbody>
              <tr className="text-sm text-left">
                <th>Image</th>

                <th>Id</th>

                <th>Title</th>

                <th>Price</th>

                <th>Action</th>
              </tr>

              {productsList?.map((item) => (
                <tr className="text-xs sm:text-sm" key={item._id}>
                  <td className="flex items-center justify-start py-2">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:h-20 md:w-20">
                      <Image
                        src={item.image}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </td>

                  <td className="text-left py-2">
                    <p className="truncate w-[60px]">{item._id}</p>
                  </td>

                  <td className="text-left py-2">
                    <p className="font-bold ">{item.title}</p>
                  </td>

                  <td className="text-left py-2">
                    <p>${item.prices[0].toFixed(2)}</p>
                  </td>

                  <td className="text-left py-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-[crimson] text-white px-1.5 py-1"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold mb-5">Orders</h1>

          <table className="w-full">
            <tbody>
              <tr className="text-sm text-left">
                <th>ID</th>

                <th>Customer</th>

                <th>Total</th>

                <th>Payment</th>

                <th>Status</th>

                <th>Action</th>
              </tr>

              {orderList?.map((item) => (
                <tr className="text-xs sm:text-sm" key={item._id}>
                  <td className="text-left py-2">
                    <p className="truncate w-[60px]">{item._id}</p>
                  </td>

                  <td className="text-left py-2">
                    <p className="font-bold ">{item.customer}</p>
                  </td>

                  <td className="text-left py-2">
                    <p>${item.total}</p>
                  </td>

                  <td className="text-left py-2">
                    <p>{item.method === 0 ? "Cash" : "Paid"}</p>
                  </td>

                  <td className="text-left py-2">
                    <p>{status[item.status]}</p>
                  </td>

                  <td className="text-left py-2">
                    <button
                      onClick={() => handleStatus(item._id)}
                      className="bg-[teal] text-white px-1.5 py-1"
                    >
                      Next
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const products = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
  ).then((res) => res.json());

  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`
  ).then((res) => res.json());

  return {
    props: {
      products,
      orders,
    },
  };
};

export default Admin;
