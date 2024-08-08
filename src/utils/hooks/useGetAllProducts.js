import { useEffect } from "react";
import { ALL_PRODUCTS_API } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { addDealProducts } from "../store/productSlice";

export const useGetAllProducts = () => {
  const dealProducts = useSelector((store) => store.product.dealProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(ALL_PRODUCTS_API);
      const data = await res.json();
      dispatch(addDealProducts(data.products));
    };

    if (dealProducts.length === 0) {
      getData();
    }
  }, []);
};
