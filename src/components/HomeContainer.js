import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useGetProductsByCategory } from "../utils/hooks/useGetProductsByCategory";
import { categoryList } from "../utils/categoryList";
import HomePageProductContainer from "./HomePageProductContainer";
import { useGetAllProducts } from "../utils/hooks/useGetAllProducts";
import HomeProductSuggestions from "./HomeProductSuggestions";
import HomePageSlider from "./HomePageSlider";

const HomeContainer = () => {
  const dealProducts = useSelector((store) => store.product.dealProducts);
  const categoryProducts = useSelector(
    (store) => store.product.categoryProducts
  );
  const isSideBar = useSelector((store) => store.app.isSideBar);

  useGetAllProducts(); //all products (top deals)
  useGetProductsByCategory(categoryList[13]); // smart phone
  useGetProductsByCategory(categoryList[7]); // men's shirt
  useGetProductsByCategory(categoryList[3]); // groceries

  // Background scroll will not work when Category is opened
  isSideBar
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  if (
    Object.values(categoryProducts).length >= 3 //Inside category their must be smart-phone, shirt, grocery (length: 3) products and others if exists
  ) {
    return (
      <div
        className={
          "px-2.5 sm:px-4 " +
          (isSideBar ? "opacity-40 pointer-events-none" : "")
        }
      >
        <HomePageSlider />

        <HomePageProductContainer
          products={dealProducts}
          category={"Top Deals"}
        />

        <HomePageProductContainer
          products={categoryProducts["smartphones"]}
          category={"Best of Smartphones"}
        />

        <HomeProductSuggestions
          products={categoryProducts["mens-shirts"]}
          category={"Trending in Men's fashion"}
        />

        <HomePageProductContainer
          products={categoryProducts["groceries"]}
          category={"Top Deals On Grocery"}
        />
      </div>
    );
  }
};
export default HomeContainer;
