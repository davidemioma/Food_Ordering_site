import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import { setAddProduct } from "../store/store";
import axios from "axios";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<any>(null);

  const [title, setTitle] = useState("");

  const [desc, setDesc] = useState("");

  const [prices, setPrices] = useState([]);

  const [extraOptions, setExtraOptions] = useState<any[]>([]);

  const [extra, setExtra] = useState<{} | any>();

  const changePrice = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const currentPrices: any = prices;

    currentPrices[index] = e.target.value;

    setPrices(currentPrices);
  };

  const handleExtra = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtra((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addToExtraOptions = () => {
    const itExists = extraOptions.find((item) => item.text === extra.text);

    !itExists && setExtraOptions((prev) => [...prev, extra]);
  };

  const createProductHandler = async () => {
    setLoading(true);

    const data = new FormData();

    data.append("file", file);

    data.append("upload_preset", "uploads");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ID}/image/upload`,
        data
      );

      const { url } = res.data;

      const newProduct = {
        title,
        description: desc,
        image: url,
        prices,
        extraOptions,
      };

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, newProduct)
        .then(() => {
          setLoading(false);

          dispatch(setAddProduct(false));
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute z-20 top-0 left-0 bg-[gray]/30 w-screen h-screen flex items-center justify-center">
      <div className="bg-white text-xs sm:text-sm shadow-xl w-11/12 max-w-lg rounded-2xl p-5 px-4">
        <button
          onClick={() => dispatch(setAddProduct(false))}
          className="bg-gray-200 ml-auto w-7 h-7 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <XIcon className="h-5" />
        </button>

        <h1 className="text-2xl font-bold tracking-wide mb-5">
          Add a new Product
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <label>Choose an image</label>

          <input type="file" onChange={(e) => setFile(e?.target?.files?.[0])} />
        </div>

        <div className="flex items-start space-x-2 mb-4">
          <label>Title:</label>

          <input
            className="border-b w-full border-gray-300 outline-none"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex items-start space-x-2 mb-4">
          <label>Description:</label>

          <textarea
            className="border w-full border-gray-300 px-2 "
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="flex items-start space-x-2 mb-4">
          <label>Prices:</label>

          <div className="flex flex-wrap gap-2">
            <input
              className="border-b border-gray-300 outline-none "
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />

            <input
              className="border-b border-gray-300 outline-none "
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />

            <input
              className="border-b border-gray-300 outline-none "
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>

        <div className="flex items-start space-x-2 mb-4">
          <label>Extras:</label>

          <div className="flex flex-wrap gap-2">
            <input
              className="border-b border-gray-300 outline-none "
              name="text"
              type="text"
              placeholder="Item"
              onChange={(e) => handleExtra(e)}
            />

            <input
              className="border-b border-gray-300 outline-none"
              name="price"
              type="number"
              placeholder="Price"
              onChange={(e) => handleExtra(e)}
            />

            <button
              className="bg-[#d1411e] text-white font-medium px-2 py-1 text-sm rounded"
              onClick={addToExtraOptions}
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-5 flex items-center flex-wrap gap-2">
          {extraOptions.map((option: any, i) => (
            <span
              className="border border-[tomato] text-[tomato] rounded-lg font-medium px-4 py-1"
              key={i}
            >
              {option.text}
            </span>
          ))}
        </div>

        <button
          className="bg-[#d1411e] disabled:cursor-not-allowed text-white w-full font-medium py-1 text-sm rounded"
          onClick={createProductHandler}
          disabled={
            loading ||
            file === null ||
            !title.trim() ||
            !desc.trim() ||
            prices.length < 1 ||
            extraOptions.length < 1
          }
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
