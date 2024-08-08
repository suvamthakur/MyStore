import { useDispatch, useSelector } from "react-redux";
import { SEARCH_PRODUCT_API } from "../apis";
import { addCategoryProducts } from "../store/productSlice";
import { useEffect } from "react";

export const useGetProductsByQuery = (query) => {
  const dispatch = useDispatch();

  const categoryProducts = useSelector(
    (store) => store.product.categoryProducts
  );

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(SEARCH_PRODUCT_API + query);
      const data = await res.json();
      dispatch(
        addCategoryProducts({
          [query]: data.products,
        })
      );
    };

    // If products are already in the store of this query then no need call the API
    if (!Object.hasOwn(categoryProducts, query)) {
      getData();
    }
  }, [query]);
};
