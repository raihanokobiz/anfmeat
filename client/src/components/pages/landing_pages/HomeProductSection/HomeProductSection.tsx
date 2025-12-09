import { TProduct } from "@/types";

import { addToCart } from "@/services/cart";
// import MainProduct from "../../products/ProductCard/ProductCard";
import HomeProductSection from "../../products/ProductCard/ProductCard";
import { getUser } from "@/services/auth";
import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
interface ProductsProps {
  products: {
    category: TProduct;
    result: TProduct[];
  };
}


const HomeProducts = async ({ products }: ProductsProps) => {
  const user = await getUser();
  console.log("HomeProducts products:", products);
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 py-6 md:py-10  lg:py-12">
      <div className="flex items-center justify-between mb-6 px-4 pb-4 border-b-2 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-[#1e6a39]" />
          Best Sellers
        </h2>
        <Link
          href="/shop"
          className="flex items-center gap-2 px-4 py-2 bg-[#1e6a39] text-white rounded-md hover:bg-[#155028] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span className="text-sm md:text-base font-semibold">View All</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
      <HomeProductSection
        products={products}
        userRef={user?.id}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default HomeProducts;
