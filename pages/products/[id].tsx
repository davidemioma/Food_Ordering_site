import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ProductProps, Options } from "../../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/store";

interface Props {
  product: ProductProps;
}

const Product = ({ product }: Props) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [price, setPrice] = useState<number>(product.prices[0]);

  const [extras, setExtras] = useState<Options[]>([]);

  const changePrice = (number: number) => {
    setPrice((prev) => prev + number);
  };

  const handleSize = (sizeIndex: number) => {
    setSize(sizeIndex);

    const difference = product.prices[sizeIndex] - product.prices[size];

    changePrice(difference);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: Options
  ) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);

      setExtras((prev) => [option, ...prev]);
    } else {
      changePrice(-option.price);

      setExtras(extras.filter((item) => item._id !== option._id));
    }
  };

  const addtoCartHandler = () => {
    dispatch(
      addToCart({
        _id: product._id,
        title: product.title,
        description: product.description,
        image: product.image,
        quantity,
        price,
        extras,
      })
    );
  };

  return (
    <div>
      <Head>
        <title>Pizza Restaurant</title>

        <meta name="description" content="Best pizza shop in town" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen md:h-[calc(100vh-96px)] p-6 flex flex-col items-center md:grid md:grid-cols-2">
        <div>
          <img
            className="w-[60%] md:w-[80%] mx-auto"
            src={product.image}
            alt=""
            loading="lazy"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-3 uppercase">{product.title}</h1>

          <h2 className="text-xl underline font-bold mb-2 text-[#d1411e]">
            ${price.toFixed(2)}
          </h2>

          <p className="text-sm">{product.description}</p>

          <div>
            <p className="my-3 font-bold">Choose the size</p>

            <div className="flex space-x-14">
              <button
                className="relative w-6 h-6 rounded-full"
                onClick={() => handleSize(0)}
              >
                <Image
                  src="/assets/size.png"
                  layout="fill"
                  objectFit="contain"
                />

                <span className="absolute -top-2 -right-8 w-12 h-4 flex items-center text-xs justify-center bg-teal-500 text-white rounded-full">
                  Small
                </span>
              </button>

              <button
                className="relative w-8 h-8 rounded-full"
                onClick={() => handleSize(1)}
              >
                <Image
                  src="/assets/size.png"
                  layout="fill"
                  objectFit="contain"
                />

                <span className="absolute -top-2 -right-8 h-4 px-1 flex items-center text-xs justify-center bg-teal-500 text-white rounded-full">
                  medium
                </span>
              </button>

              <button
                className="relative w-10 h-10 rounded-full"
                onClick={() => handleSize(2)}
              >
                <Image
                  src="/assets/size.png"
                  layout="fill"
                  objectFit="contain"
                />

                <span className="absolute -top-2 -right-7 w-12 h-4 flex items-center text-xs justify-center bg-teal-500 text-white rounded-full">
                  Large
                </span>
              </button>
            </div>
          </div>

          <div>
            <p className="my-3 font-bold">Choose additional ingredients</p>

            <div className="flex items-center gap-2 flex-wrap">
              {product.extraOptions?.map((option) => (
                <div key={option._id} className="flex items-center space-x-1">
                  <input
                    id={option.text}
                    name={option.text}
                    type="checkbox"
                    onChange={(e) => handleChange(e, option)}
                  />

                  <label className="text-xs" htmlFor={option.text}>
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center space-x-2">
            <input
              className="w-10 border rounded outline-none"
              type="number"
              value={quantity}
              max={10}
              min={1}
              onChange={(e) => setQuantity(e.target.valueAsNumber)}
            />

            <button
              onClick={addtoCartHandler}
              className="bg-[#d1411e] text-white font-bold text-sm py-1 px-2 rounded"
            >
              Add to cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
  ).then((res) => res.json());

  return {
    props: {
      product,
    },
  };
};

export default Product;
