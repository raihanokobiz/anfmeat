"use client";

import { apiBaseUrl } from "@/config/config";
import { TProduct } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Key, useState } from "react";

interface Props {
  products: TProduct;
  shipping: number;
  coupon?: string | null; // Add this prop
}

const CartOverView: React.FC<Props> = ({ products, shipping, coupon }) => {
  const [showCartOverview, setShowCartOverview] = useState(false);

  return (
    <div className="top-20 sticky">
      <div
        onClick={() => setShowCartOverview((prev) => !prev)}
        className="top-0 left-0 absolute lg:hidden bg-[#1D4092] w-full py-2 cursor-pointer"
      >
        <h2 className="text-center text-white text-sm font-semibold">
          Cart Overview
        </h2>
      </div>

      <AnimatePresence>
        {(showCartOverview ||
          (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
            <motion.div
              key="cart-overview"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 50 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`bg-gray-100 px-10 py-8 rounded ${
                showCartOverview ? "block" : "hidden"
              } lg:block lg:mt-8`}
            >
              <div className="flex xl:justify-center gap-4 border-b border-black/20 pb-2">
                <div className="xl:text-2xl text-xl font-bold">Cart Overview</div>
                <Link href="/cart">
                  <div className="font-bold text-blue-700 hover:underline">
                    Modify Order
                  </div>
                </Link>
              </div>

              <div className="justify-center gap-4 text-sm">
                <div className="xl:py-8 py-4 space-y-4">
                  {products?.cartDetails?.map(
                    (item: {
                      cartId: Key | null | undefined;
                      quantity: number;
                      product: TProduct;
                      subtotal: number;
                      productDiscount: number;
                      couponDiscount: number;
                      isCouponApplicable?: boolean;
                    }) => (
                      <div 
                        className="py-3 border-b border-gray-300 last:border-0" 
                        key={item.cartId}
                      >
                        <p className="pb-2 font-semibold text-gray-800">
                          {item?.product?.name}
                        </p>
                        
                        <div className="flex justify-between items-start gap-3">
                          {item?.product?.thumbnailImage && (
                            <Image
                              height={100}
                              width={100}
                              src={apiBaseUrl + item?.product?.thumbnailImage}
                              alt={item?.product?.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          
                          <div className="flex-1 text-right">
                            <p className="text-gray-700">
                              {item?.quantity || 0} X ৳{item?.product?.price}
                            </p>
                            <p className="font-semibold text-green-700 mt-1">
                              ৳{item?.subtotal || 0}
                            </p>
                            
                            {/* Product Discount */}
                            {item.productDiscount > 0 && (
                              <p className="text-xs text-green-600 mt-1">
                            Product Discount: -৳{item.productDiscount}
                              </p>
                            )}
                            
                            {/* Coupon Status */}
                            {coupon && (
                              <>
                                {item.isCouponApplicable === true && item.couponDiscount > 0 ? (
                                  <p className="text-xs text-green-600 mt-1 flex items-center justify-end gap-1">
                                    <span>🎉</span>
                                    Coupon: -৳{item.couponDiscount}
                                  </p>
                                ) : (
                                  <p className="text-xs text-orange-600 mt-1 flex items-center justify-end gap-1">
                                    এই প্রোডাক্টে কুপন প্রযোজ্য নয়
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Coupon Summary */}
              {coupon && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-blue-800">
                      কুপন কোড: {coupon}
                    </p>
  
                  </div>
                  
                  {products?.cartDetails?.some(
                    (item: any) => item.isCouponApplicable === false
                  ) && (
                    <p className="text-xs text-orange-600 mt-2">
                    এই প্রোডাক্টে এই কুপন প্রযোজ্য নয়
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-between font-bold text-[16px] py-3 border-t border-black/20">
                <p>Subtotal:</p>
                <p className="text-green-700 text-[20px]">
                  ৳{products?.subTotalPrice}
                </p>
              </div>
              
              <div className="flex justify-between font-bold text-[16px] py-3">
                <p>Shipping (+):</p>
                <p className="text-green-700 text-[20px]">৳{shipping}</p>
              </div>
              
              <div className="flex justify-between font-bold text-[16px] py-3">
                <p>Discount (-):</p>
                <p className="text-green-700 text-[20px]">
                  ৳{products?.couponDiscount || 0}
                </p>
              </div>
              
              <div className="flex justify-between font-bold text-[20px] py-3 border-t border-black/20">
                <p>Payable:</p>
                <p className="text-green-700">
                  ৳{products.subTotalPrice - (products?.couponDiscount ?? 0) + shipping}
                </p>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default CartOverView;