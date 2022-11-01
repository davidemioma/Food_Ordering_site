import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#222] flex flex-col lg:flex-row lg:h-[calc(100vh-96px)]">
      <img
        className="hidden w-[35%] lg:inline h-[calc(100vh-96px)] object-cover"
        src="/assets/bg.png"
        alt=""
        loading="lazy"
      />

      <div className="grid md:grid-cols-3 gap-y-6 gap-x-2 p-6 md:px-10 md:py-14 ">
        <div>
          <h2 className="text-[#b7903c] font-bold text-2xl max-w-[300px]">
            OH YES, WE DID. THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>

        <div className="space-y-3 text-[lightgray] text-sm">
          <h2 className="text-[#b7903c] font-bold text-base">
            FIND OUR RESTAURANTS
          </h2>

          <p>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>

          <p>
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>

          <p>
            1614 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1012
          </p>

          <p>
            1614 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1013
          </p>
        </div>

        <div className="space-y-3 text-[lightgray] text-sm">
          <h2 className="text-[#b7903c] font-bold text-base">WORKING HOURS</h2>

          <p>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>

          <p>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
