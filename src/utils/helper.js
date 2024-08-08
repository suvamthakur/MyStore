import { addFilteredProducts } from "./store/productSlice";

// Calculated Price, Discount
export const getCalculatedAmount = (price, discountPercentage) => {
  const productPrice = Math.round(price * 85);
  const discount = Math.round(discountPercentage * 3);

  const originalPrice = Math.round(
    productPrice - (productPrice * discount) / 100
  );
  return [originalPrice, discount];
};

// Sorting
export const priceHighToLow = (products, dispatch) => {
  // Avoding direct use of products
  const newProducts = [...products];
  dispatch(
    addFilteredProducts(
      newProducts.sort((a, b) => {
        // Converting to Rupees and then calculating the original price
        const priceA =
          Math.round(a.price * 85) -
          (Math.round(a.price * 85) * Math.round(a.discountPercentage * 3)) /
            100;

        const priceB =
          Math.round(b.price * 85) -
          (Math.round(b.price * 85) * Math.round(b.discountPercentage * 3)) /
            100;

        return priceA < priceB ? 1 : -1;
      })
    )
  );
};

export const priceLowToHigh = (products, dispatch) => {
  const newProducts = [...products];
  dispatch(
    addFilteredProducts(
      newProducts.sort((a, b) => {
        const priceA =
          Math.round(a.price * 85) -
          (Math.round(a.price * 85) * Math.round(a.discountPercentage * 3)) /
            100;

        const priceB =
          Math.round(b.price * 85) -
          (Math.round(b.price * 85) * Math.round(b.discountPercentage * 3)) /
            100;

        return priceA < priceB ? -1 : 1;
      })
    )
  );
};

export const topRated = (products, dispatch) => {
  const newProducts = [...products];
  dispatch(
    addFilteredProducts(
      newProducts.sort((a, b) => {
        return a.rating < b.rating ? 1 : -1;
      })
    )
  );
};

// Form validation
export const formValidation = (name = "Abc", email, password) => {
  if (name && email && password) {
    const isNameValid = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(
      password
    );

    if (!isNameValid)
      return "Invalid name! Start with a capital letter. May include letters, - , . , ' , and spaces";

    if (!isEmailValid)
      return "Invalid email! Email format (e.g., user@example.com).";

    if (!isPasswordValid)
      return "Invalid password! At least 8 characters long with at least one letter and one number.";

    return null;
  }
};
