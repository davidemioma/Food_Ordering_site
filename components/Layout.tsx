import React from "react";
import { useSelector } from "react-redux";
import { addproductSelector, useCashSelector } from "../store/modal-slice";
import Footer from "./Footer";
import Nav from "./Nav";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const useCash = useSelector(useCashSelector);

  const addProduct = useSelector(addproductSelector);

  return (
    <div
      className={`relative w-screen overflow-x-hidden ${
        useCash && "h-screen overflow-y-hidden"
      } ${addProduct && "h-screen overflow-y-hidden"}`}
    >
      <Nav />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
