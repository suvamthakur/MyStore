import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilteredProducts } from "../store/productSlice";

export const useGetFilteredProducts = (products) => {
  const dispatch = useDispatch();

  const filters = useSelector((store) => store.product.filters);

  // Copying all the products to filterProducts (Initially filters.price is Inifinity)
  // Here, dependency array contains products because initially products: undefined
  useEffect(() => {
    if (products) {
      dispatch(
        addFilteredProducts(
          products
            .filter(
              (product) =>
                Math.round(product.price * 85) -
                  (Math.round(product.price * 85) *
                    Math.round(product.discountPercentage * 3)) /
                    100 <=
                filters.price
            )
            .filter((product) => {
              if (filters.brands.length > 0) {
                return filters.brands.includes(product.brand);
              }
              return true;
            })
            .filter((product) => {
              if (filters.discounts.length > 0) {
                return filters.discounts.some(
                  (discount) =>
                    discount < Math.round(product.discountPercentage * 3)
                );
              }
              return true;
            })
            .filter((product) => {
              if (filters.ratings.length > 0) {
                return filters.ratings.some(
                  (rating) => rating <= Math.round(product.rating)
                );
              }
              return true;
            })
        )
      );
    }
  }, [products, filters]);
};
