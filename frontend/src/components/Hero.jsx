import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-y-gray-400 Banner">
      {/*=============== Hero Left Side =========================*/}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#000] px-10">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#000]"></p>
            <p className="font-medium text-sm md:text-base">Get Fresh</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Organic
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">Food Everyday</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#000]"></p>
          </div>
          <p className="mt-5">Making Grocery Food Errrands Worth Your While</p>
          <Link to="/collection">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white h-10 px-4 py-2 bg-green-700 mt-5">
              Buy Product
            </button>
          </Link>
        </div>
      </div>
      {/*============= Hero Right Side ================== */}
      <img className="w-full" src={assets.hero_img} alt="" />
    </div>
  );
};

export default Hero;
