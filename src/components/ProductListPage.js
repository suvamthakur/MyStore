import { useSearchParams } from "react-router-dom";
import { useGetProductsByCategory } from "../utils/hooks/useGetProductsByCategory";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import FilterProdcutsSideBar from "./FilterProdcutsSideBar";
import SortOptionsContainer from "./SortOptionsContainer";
import { useGetFilteredProducts } from "../utils/hooks/useGetFilteredProducts";
import { useGetProductsByQuery } from "../utils/hooks/useGetProductsByQuery";
import {
  addBrandsFilter,
  addDiscountFilter,
  addPriceFilter,
  addRatingsFilter,
} from "../utils/store/productSlice";
import { FiMenu } from "react-icons/fi";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);

  const isSideBar = useSelector((store) => store.app.isSideBar);
  const categoryProducts = useSelector(
    (store) => store.product.categoryProducts
  );
  const filteredProducts = useSelector(
    (store) => store.product.filteredProducts
  );

  const [searchParam] = useSearchParams();
  const category = searchParam.get("c");
  const query = searchParam.get("q");

  useGetProductsByCategory(category);
  useGetProductsByQuery(query);

  // If I get result from query search then no need to show category products
  const products =
    categoryProducts[query]?.length !== 0
      ? categoryProducts[query]
      : categoryProducts[category];

  // Background scroll will not work when Category is opened
  useEffect(() => {
    isSideBar || showFilters
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isSideBar, showFilters]);

  // The Main filter logic is implemented here
  useGetFilteredProducts(products);

  // Cleaning filters
  useEffect(() => {
    return () => {
      dispatch(addPriceFilter(Infinity));
      dispatch(addBrandsFilter([]));
      dispatch(addDiscountFilter([]));
      dispatch(addRatingsFilter([]));
    };
  }, [products]);

  //
  const screenWidth = window.innerWidth;

  if (products) {
    return (
      <div className={isSideBar ? "opacity-40 pointer-events-none" : ""}>
        <div>
          {filteredProducts.length !== 0 && (
            <SortOptionsContainer
              products={products}
              filteredProducts={filteredProducts}
              searchQuery={query}
            />
          )}
          {screenWidth < 768 && (
            <div
              className="bg-white flex justify-end p-2.5"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="font-semibold mr-1.5">Filters</span>
              <FiMenu className="text-2xl" />
            </div>
          )}
          <div className="flex">
            <div
              className={
                "absolute w-screen top-30 h-[62vh] md:w-4/12 lg:w-1/5 md:h-[90vh] md:sticky md:top-12 " +
                (screenWidth > 768 || showFilters ? "z-10" : "-z-10")
              } // otherwise the price section will not mount and filters will not be applied
            >
              <FilterProdcutsSideBar products={products} query={query} />
            </div>

            <div className=" md:w-8/12 lg:w-4/5 bg-white mt-2 pb-5">
              {filteredProducts.length === 0 ? (
                <p className="font-semibold text-2xl text-center mt-10">
                  <span className="text-red-600">Opps!</span> No products found.
                </p>
              ) : (
                <div className="flex flex-wrap">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} productData={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductListPage;
