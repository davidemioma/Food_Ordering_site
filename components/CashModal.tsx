import React, { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { setUseCash } from "../store/store";

interface Props {
  totalAmount: number;
  createOrder: (data: any) => void;
}

const CashModal = ({ totalAmount, createOrder }: Props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [address, setAddress] = useState("");

  const onClickHandler = () => {
    if (!name.trim() || !phoneNumber.trim() || !address.trim()) return;

    createOrder({
      customer: name,
      address: address,
      total: totalAmount,
      method: 0,
    });
  };

  return (
    <div className="absolute z-20 top-0 left-0 bg-[gray]/30 w-screen h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl w-11/12 max-w-lg rounded-2xl p-5 px-4">
        <button
          onClick={() => dispatch(setUseCash(false))}
          className="bg-gray-200 ml-auto w-7 h-7 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <XIcon className="h-5" />
        </button>

        <h1 className="my-4 text-2xl font-light text-center">
          You will pay ${totalAmount.toFixed(2)} after delivery.
        </h1>

        <div className="text-sm space-y-4 mb-5">
          <div className="flex flex-col space-y-2">
            <label>Full Name</label>

            <input
              className="border border-gray-300 outline-none py-1 px-2"
              value={name}
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label>Phone Number</label>

            <input
              className="border border-gray-300 outline-none py-1 px-2"
              value={phoneNumber}
              type="text"
              placeholder="+1 234 567 89"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label>Address</label>

            <textarea
              className="border border-gray-300 outline-none py-1 px-2"
              value={address}
              rows={5}
              placeholder="Elton St. 505 NY"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-end">
          <button
            onClick={onClickHandler}
            className="bg-[teal] text-white text-sm py-1 px-4 rounded-lg"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashModal;
