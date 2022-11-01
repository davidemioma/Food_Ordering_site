import React from "react";
import Head from "next/head";
import Status from "../../components/Status";
import { GetServerSideProps } from "next";
import { OrderProps } from "../../types";

interface Props {
  order: OrderProps;
}

const Order = ({ order }: Props) => {
  const discount = 0;

  return (
    <div>
      <Head>
        <title>Order # - Pizza Restaurant</title>

        <meta name="description" content="Best pizza shop in town" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen p-6 flex flex-col gap-x-2 gap-y-5 lg:flex-row">
        <div className="flex-1">
          <div className="w-full">
            <table className="w-full">
              <tbody>
                <tr className="text-xs sm:text-sm text-left">
                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Address</th>

                  <th>Total</th>
                </tr>

                <tr className="text-xs sm:text-sm text-left">
                  <td className="py-2">
                    <p className="truncate w-[60px] sm:w-full">{order._id}</p>
                  </td>

                  <td className="py-2">
                    <p>{order.customer}</p>
                  </td>

                  <td className="py-2">
                    <p className="truncate max-w-[60px] sm:max-w-[180px]">
                      {order.address}
                    </p>
                  </td>

                  <td className="py-2">
                    <p>${order.total.toFixed(2)}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center space-x-5 sm:space-x-14">
            <Status
              status={order.status}
              index={0}
              photoUrl="/assets/paid.png"
              task="Payment"
            />

            <Status
              status={order.status}
              index={1}
              photoUrl="/assets/bake.png"
              task="Preparing"
            />

            <Status
              status={order.status}
              index={2}
              photoUrl="/assets/bike.png"
              task="On the way"
            />

            <Status
              status={order.status}
              index={3}
              photoUrl="/assets/delivered.png"
              task="Delivered"
            />
          </div>
        </div>

        <div className="w-full max-w-sm bg-[#333] py-6 px-8">
          <h1 className="text-white font-bold text-xl uppercase">cart total</h1>

          <div className="my-3 text-sm space-y-0.5">
            <p className="text-gray-300 ">
              <span className="text-white font-bold">Subtotal: </span>$
              {order.total.toFixed(2)}
            </p>

            <p className="text-gray-300 ">
              <span className="text-white font-bold">Discount: </span>$
              {discount.toFixed(2)}
            </p>

            <p className="text-gray-300 ">
              <span className="text-white font-bold">Total: </span>$
              {(order.total - discount).toFixed(2)}
            </p>
          </div>

          <button className="bg-white w-full text-green-500 py-1 uppercase font-medium">
            paid
          </button>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const order = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`
  ).then((res) => res.json());

  return {
    props: {
      order,
    },
  };
};

export default Order;
