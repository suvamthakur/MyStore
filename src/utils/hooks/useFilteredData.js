import { getCalculatedAmount } from "../helper";

export const useFilteredData = (products) => {
  if (products) {
    return products.map((product) => {
      return getCalculatedAmount(product.price, product.discountPercentage);
    });
  }
};
