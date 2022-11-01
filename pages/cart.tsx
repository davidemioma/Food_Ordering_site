import React, { useState } from "react";
import Head from "next/head";
import CartItems from "../components/CartItems";
import Table from "../components/Table";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, totalAmount } from "../store/cart-slice";
import { resetCart, setUseCash } from "../store/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ButtonWrapper from "../components/ButtonWrapper";
import axios from "axios";
import CashModal from "../components/CashModal";
import { useCashSelector } from "../store/modal-slice";

const Cart = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [openPayPal, setOpenPayPal] = useState(false);

  const useCash = useSelector(useCashSelector);

  const cart = useSelector(cartSelector);

  const subTotal = useSelector(totalAmount);

  const currency = "USD";

  const discount = 0;

  const createOrder = async (data: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
        data
      );

      dispatch(resetCart());

      res.status === 201 && router.push(`/orders/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Cart - Pizza Restaurant</title>

        <meta name="description" content="Best pizza shop in town" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      {cart.length > 0 ? (
        <main className="w-screen p-6 flex flex-col gap-x-2 gap-y-5 lg:flex-row">
          <div className="lg:flex-1">
            <div className="sm:hidden">
              <CartItems items={cart} />
            </div>

            <div className="hidden sm:inline">
              <Table items={cart} />
            </div>
          </div>

          <div className="w-full max-w-sm bg-[#333] py-6 px-8">
            <h1 className="text-white font-bold text-xl uppercase">
              cart total
            </h1>

            <div className="my-3 text-sm space-y-0.5">
              <p className="text-gray-300 ">
                <span className="text-white font-bold">Subtotal: </span>$
                {subTotal.toFixed(2)}
              </p>

              <p className="text-gray-300 ">
                <span className="text-white font-bold">Discount: </span>$
                {discount.toFixed(2)}
              </p>

              <p className="text-gray-300 ">
                <span className="text-white font-bold">Total: </span>$
                {(subTotal - discount).toFixed(2)}
              </p>
            </div>

            {openPayPal ? (
              <div className="mb-5 flex flex-col space-y-5">
                <button
                  onClick={() => dispatch(setUseCash(true))}
                  className="uppercase w-full bg-white text-[teal] font-bold rounded py-1.5 px-2"
                >
                  cash on delivery
                </button>

                {!useCash && (
                  <PayPalScriptProvider
                    options={{
                      "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
                      components: "buttons",
                      currency: "USD",
                      "disable-funding": "credit,card,p24",
                    }}
                  >
                    <ButtonWrapper
                      currency={currency}
                      showSpinner={false}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                )}
              </div>
            ) : (
              <button
                onClick={() => setOpenPayPal(true)}
                className="bg-white w-full text-[#d1411e] py-1 uppercase font-medium mb-5"
              >
                checkout now!
              </button>
            )}

            <button
              onClick={() => dispatch(resetCart())}
              className="bg-white w-full text-[#d1411e] py-1 uppercase font-medium"
            >
              clear cart!
            </button>
          </div>
        </main>
      ) : (
        <main className="w-screen h-[calc(100vh-96px)] flex flex-col items-center justify-center p-6 space-y-2">
          <img
            className="w-40 h-40 object-contain"
            loading="lazy"
            src="https://cdn-icons-png.flaticon.com/512/102/102661.png"
            alt=""
          />

          <p className="text-lg font-bold">Your cart is empty!</p>
        </main>
      )}

      {useCash && (
        <CashModal totalAmount={subTotal} createOrder={createOrder} />
      )}
    </div>
  );
};

export default Cart;
