import React from "react";
import { ProductCard, ProductCard2 } from "./ProductCard";
import { AmazonPay, Upcominglaunches, StylesForMen, assetsImg, ShoppingDeals, HomeStyle } from "../Data/data"
import ProductSlider from "./ProductSlider";
// import { ProductDetail } from '../Details/ProductDetail'
import PrimeSlider from "./PrimeSlider";

const MainSection = () => {
  return (
    <>
      <div className="max-w-375 mx-auto">
        <PrimeSlider />
        <div className=" flex justify-start m-2">
          <ProductCard2 Detail={ShoppingDeals} title="Continue shopping deals" />
          <ProductCard2 Detail={Upcominglaunches} title="Latest and upcoming launches" />
          <ProductCard2 Detail={HomeStyle} title="Revamp your home in style" />
          <ProductCard2 Detail={AmazonPay} title="Amazon pay Book Travel Tickets" />
        </div>
        <div className="flex justify-start m-2">
          <ProductCard
            title="Bluetooth Calling Smartwatch starts at ₹1,999"
            img={assetsImg.offerImgB2}
            offer="Shop Now"
          />
          <ProductCard2 Detail={StylesForMen} title="Up to 60% off | Styles for men" />
          <ProductCard
            title="Up to 70% off | Clearance store"
            img={assetsImg.offerImgB1}
            offer="Shop Now"
          />
          <ProductCard2 Detail={AmazonPay} title="Amazon pay Book Travel Tickets" />
        </div>

        <ProductSlider />
      </div>
    </>
  );
};

export default MainSection;
