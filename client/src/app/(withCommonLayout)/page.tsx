import Banner from "@/components/pages/landing_pages/Banner/Banner";
import Category from "@/components/pages/landing_pages/Category/Category";
import SubCategory from "@/components/pages/landing_pages/SubCategory/SubCategory";
import React from "react";
import HomeProductSection from "@/components/pages/landing_pages/HomeProductSection/HomeProductSection";
import TopChildCategory from "@/components/pages/landing_pages/TopChildCategory/TopChildCategory";
import { getHomePageSubCategoryProducts } from "@/services/products";
import MiddleChildCategory from "@/components/pages/landing_pages/MiddleChildCategory/MiddleChildCategory";
import LowerMiddleChildCategory from "@/components/pages/landing_pages/LowerMiddleChildCategory/LowerMiddleChildCategory";
import { getAllChildCategorys } from "@/services/childCategorys";
import ButtomChildCategory from "@/components/pages/landing_pages/ButtomChildCategory/ButtomChildCategory";
import Campaign from "@/components/pages/landing_pages/Campaign/Campaign";
import { getCampaign } from "@/services/campaign";
import Offer from "@/components/pages/landing_pages/offer/Offer";
import Text1 from "../../assets/texture/Text1.jpg";
import { PopularItems } from "@/components/pages/landing_pages/PopularItems/PopularItems";

// import { getCartProducts } from "@/services/cart";
// import NavBar from "@/components/pages/header/NavBar/NavBar";

// import { getUser } from "@/services/auth";
// import { getUser } from "@/services/auth";

const page = async () => {
  const topRes = await getHomePageSubCategoryProducts("top");
  const middleRes = await getHomePageSubCategoryProducts("middle");
  const lowerMiddleRes = await getHomePageSubCategoryProducts("lowerMiddle");
  const buttomRes = await getHomePageSubCategoryProducts("buttom");

  const topChildCategoriesList = await getAllChildCategorys("top");

  const middleChildCategoriesList = await getAllChildCategorys("middle");
  const lowerMiddleChildCategoriesList = await getAllChildCategorys(
    "lowerMiddle"
  );
  const buttomChildCategoriesList = await getAllChildCategorys("buttom");

  // ------for campaign----

  const { data: campaign } = await getCampaign();
  // slkfjdlkf

  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);

  return (
    <>
      {/* <NavBar userCartProducts={products?.data} /> */}
      <div className="">
        <Banner banners={[]} />
        <div
          style={{
            backgroundImage: `url(${Text1.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Category />
          <Offer />
        </div>
        {/* <SubCategory /> */}
        {/* <ChildCategory />   */}
        <TopChildCategory childCategoriesList={topChildCategoriesList?.data} />
        {topRes?.status === "success" && (
          <HomeProductSection products={topRes?.data} />
        )}
        <PopularItems />
        {/* <MiddleChildCategory
          childCategoriesList={middleChildCategoriesList?.data}
        />
        {middleRes?.status === "success" && (
          <HomeProductSection products={middleRes?.data} />
        )} */}

        {/* <Campaign campaign={campaign[0]} /> */}

        {/* <LowerMiddleChildCategory
          childCategoriesList={lowerMiddleChildCategoriesList?.data}
        />

        {lowerMiddleRes?.status === "success" && (
          <HomeProductSection products={lowerMiddleRes?.data} />
        )}

        <ButtomChildCategory
          childCategoriesList={buttomChildCategoriesList?.data}
        />

        {buttomRes?.status === "success" && (
          <HomeProductSection products={buttomRes?.data} />
        )} */}
      </div>
    </>
  );
};

export default page;
