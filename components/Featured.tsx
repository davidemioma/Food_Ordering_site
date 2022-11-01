import React, { useState } from "react";
import Image from "next/image";

const Featured = () => {
  const [index, setIndex] = useState(0);

  const images = [
    "/assets/feature.png",
    "/assets/feature2.png",
    "/assets/feature3.png",
  ];

  const handleArrow = (direction: string) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : images.length - 1);
    }

    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className="relative bg-[#d1411e] h-[calc(100vh-96px)]">
      <button
        className="absolute z-10 left-4 md:left-6 top-1/2 -translate-y-1/2"
        onClick={() => handleArrow("l")}
      >
        <Image
          src="/assets/arrowl.png"
          width={64}
          height={64}
          objectFit="contain"
        />
      </button>

      <div
        style={{ transform: `translateX(${-100 * index}vw)` }}
        className="absolute top-0 h-full bg-[#d1411e] w-[300vw] flex items-center transition-transform duration-500 ease-in-out"
      >
        {images.map((image, i) => (
          <div key={i} className="relative w-screen h-full">
            <Image src={image} layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>

      <button
        className="absolute z-10 right-4 md:right-6 top-1/2 -translate-y-1/2"
        onClick={() => handleArrow("r")}
      >
        <Image
          src="/assets/arrowr.png"
          width={64}
          height={64}
          objectFit="contain"
        />
      </button>
    </div>
  );
};

export default Featured;
