import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isSideBar: false,
    loginPopUp: false,
    searchCache: {},
    geminiFilteredSearch: {},
  },
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBar = !state.isSideBar;
    },
    addLoginPopUp: (state) => {
      state.loginPopUp = !state.loginPopUp;
    },

    addSearchCache: (state, action) => {
      if (Object.keys(state.searchCache).length > 5) {
        const firstKey = Object.keys(state.searchCache)[0];
        delete state.searchCache[firstKey];
      }
      state.searchCache = { ...state.searchCache, ...action.payload };
    },

    addGeminiFilteredSearch: (state, action) => {
      state.geminiFilteredSearch = action.payload;
    },

    removeGeminiFilter: (state) => {
      state.geminiFilteredSearch = {};
    },
    removeGeminiPriceFilter: (state) => {
      state.geminiFilteredSearch.price = null;
    },
    removeGeminiIsPriceUnder: (state) => {
      state.geminiFilteredSearch.isPriceUnder = null;
    },
    removeGeminiBrandFilter: (state) => {
      state.geminiFilteredSearch.brand = null;
    },
  },
});

export const {
  toggleSideBar,
  addLoginPopUp,
  addSearchCache,
  addGeminiFilteredSearch,
  removeGeminiPriceFilter,
  removeGeminiIsPriceUnder,
  removeGeminiBrandFilter,
} = appSlice.actions;
export default appSlice.reducer;
