import React, { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { totalAmount } from "../store/cart-slice";

interface Props {
  currency: string;
  showSpinner: boolean;
  createOrder: (data: any) => void;
}

const style = { layout: "vertical" };

const ButtonWrapper = ({ currency, showSpinner, createOrder }: Props) => {
  const amount = useSelector(totalAmount);

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="" />}

      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, action) => {
          return action.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: `${amount}`,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={async (data, actions) => {
          return actions?.order?.capture().then((details) => {
            const shipping = details.purchase_units[0].shipping;

            createOrder({
              customer: shipping?.name?.full_name,
              address: shipping?.address?.address_line_1,
              total: amount,
              method: 1,
            });
          });
        }}
      />
    </>
  );
};

export default ButtonWrapper;
