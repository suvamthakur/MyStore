import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_BY_CATEGORY_API } from "../apis";
import { addCategoryProducts } from "../store/productSlice";
import { useEffect } from "react";

export const useGetProductsByCategory = (category) => {
  const dispatch = useDispatch();

  const categoryProducts = useSelector(
    (store) => store.product.categoryProducts
  );

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(PRODUCTS_BY_CATEGORY_API + category);
      const data = await res.json();

      dispatch(
        addCategoryProducts({
          [category]: data.products,
        })
      );
    };
    // If products are already in the store of this category then no need call the API
    if (!Object.hasOwn(categoryProducts, category)) {
      getData();
    }
  }, [category]);
};
