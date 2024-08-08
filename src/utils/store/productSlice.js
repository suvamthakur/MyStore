import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    dealProducts: [],
    categoryProducts: {},
    productInfo: null,
    filteredProducts: [],
    filters: {
      price: Infinity, // To render all products (initially)
      brands: [],
      discounts: [],
      ratings: [],
    },
  },
  reducers: {
    addDealProducts: (state, action) => {
      state.dealProducts = action.payload;
    },
    addCategoryProducts: (state, action) => {
      state.categoryProducts = { ...state.categoryProducts, ...action.payload };
    },
    addProductInfo: (state, action) => {
      state.productInfo = action.payload;
    },
    addFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },

    // Filters
    addPriceFilter: (state, action) => {
      state.filters.price = action.payload;
    },

    addBrandsFilter: (state, action) => {
      if (action.payload.length === 0) {
        state.filters.brands = [];
      } else {
        state.filters.brands.push(action.payload);
      }
    },
    removeBrandsFromFilter: (state, action) => {
      const brands = state.filters.brands;
      state.filters.brands.splice(brands.indexOf(action.payload), 1); // removing the element
    },

    addDiscountFilter: (state, action) => {
      if (action.payload.length === 0) {
        state.filters.discounts = [];
      } else {
        state.filters.discounts.push(action.payload);
      }
    },
    removeDiscountFilter: (state, action) => {
      const discounts = state.filters.discounts;
      state.filters.discounts.splice(discounts.indexOf(action.payload), 1);
    },

    addRatingsFilter: (state, action) => {
      if (action.payload.length === 0) {
        state.filters.ratings = [];
      } else {
        state.filters.ratings.push(action.payload);
      }
    },
    removeRatingsFilter: (state, action) => {
      const ratings = state.filters.ratings;
      state.filters.ratings.splice(ratings.indexOf(action.payload), 1);
    },
  },
});

export const {
  addDealProducts,
  addCategoryProducts,
  addProductInfo,
  addFilteredProducts,
  addPriceFilter,
  addBrandsFilter,
  removeBrandsFromFilter,
  addDiscountFilter,
  removeDiscountFilter,
  addRatingsFilter,
  removeRatingsFilter,
} = productSlice.actions;
export default productSlice.reducer;
