import { useEffect } from "react";
import { SINGLE_PRODUCT_API } from "../apis";
import { useDispatch } from "react-redux";
import { addProductInfo } from "../store/productSlice";

export const useGetProductInfo = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(SINGLE_PRODUCT_API + id);
      const data = await res.json();
      dispatch(addProductInfo(data));
    };

    getData();
  }, [id]); // To get new data every time product change (similar product card)
};
