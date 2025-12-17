"use client"

import { rajdhani } from "@/app/font";
import ProductCard from "../ProductCard/ProductCard";
import { TProduct } from "@/types";
import React from "react";

interface Products {
  relativeProducts: TProduct[];
}

const ReletiveProducts: React.FC<Products> = ({ relativeProducts }) => {
  return (
    <div  className="">
      <h2
        className={`text-xl font-semibold border-b pb-3 ${rajdhani.className}`}
      >
        Related Products :
      </h2>

      <div className="mt-8 gap-4 mt-8 gap-4 w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {relativeProducts?.slice(0, 12).map((product) => (
          <ProductCard key={product._id} products={[product]} />
        ))}
      </div>
    </div>
  );
};

export default ReletiveProducts;
