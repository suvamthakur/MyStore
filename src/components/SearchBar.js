import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_SUGGESTIONS_API } from "../utils/apis";
import {
  addGeminiFilteredSearch,
  addSearchCache,
} from "../utils/store/appSlice";
import model from "../utils/gemini";
import { categoryList } from "../utils/categoryList";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestion, setShowSuggetion] = useState(true); // To show and hide the search Suggrestion
  const searchCache = useSelector((store) => store.app.searchCache);
  const isSideBar = useSelector((store) => store.app.isSideBar);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (showSuggestion && searchQuery !== "") {
      const timer = setTimeout(() => {
        if (searchCache[searchQuery]) {
          setSearchSuggestions(searchCache[searchQuery]);
        } else {
          getSearchSuggestion();
        }
      }, 300);

      // Debouncing
      return () => {
        clearTimeout(timer);
      };
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  // Search Suggetion
  const getSearchSuggestion = () => {
    const getData = async () => {
      const res = await fetch(SEARCH_SUGGESTIONS_API + searchQuery);
      const data = await res.json();
      const suggestion = data.suggestions.map((e) => e.value);
      dispatch(
        addSearchCache({
          [searchQuery]: suggestion,
        })
      );

      setSearchSuggestions(suggestion);
    };
    getData();
  };

  // GEMINI Search
  const getGeminiSearch = (serchText) => {
    if (serchText !== "") {
      // To hide and delete the search Suggrestion
      setShowSuggetion(false);
      setSearchSuggestions([]);

      const timer = setInterval(() => {
        if (progressValue >= 100) {
          setProgressValue(0);
          return clearInterval(timer);
        }
        setProgressValue((val) => val + 10);
      }, 250);

      const run = async () => {
        const prompt =
          "Given the following category list: " +
          categoryList +
          ', analyze the search query and extract the following details: 1. Category: Identify the category from the provided list that best matches the search query, 2. Price: Extract the price value if mentioned in the search query, 3. isPriceUnder: Determine if the query indicates the price is below a specified amount (true/false), 4. Brand: Extract the brand name if mentioned. Return the result as an object in the following format: { category: matched-category, price: price-value, isPriceUnder: true/false, brand: brand-name}. Example1: For "mobile above 10000", return: { "category": "smartphones", "price": 10000, "isPriceUnder": false, "brand": null }. Example2: For "oppo mobile under 10000", return { "category": "smartphones", "price": 10000, "isPriceUnder": true, "brand": "Oppo" }. Example3: For "shoes for women", return { "category": "womens-shoes, "price": null, "isPriceUnder": null, "brand": null }. Also brand name of iphone is apple and brand, category should be stored as a text. ***Return only the object with no additional text*** dont write ```json ``` in the result. Ensure the category is selected from the provided list, and analyze the entire query to determine the correct category. Now the original search query by user is: ' +
          serchText;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        const data = JSON.parse(text);

        dispatch(addGeminiFilteredSearch(data));

        setProgressValue(100);

        navigate(
          "/products/search?" +
            (data.category ? "c=" + data.category + "&" : "") +
            "q=" +
            serchText
        );

        setShowSuggetion(true);
      };

      run();
    }
  };

  return (
    <>
      <div
        className={`progress-bar bg-sky-600 pt-0.5 absolute top-0 left-0 w-[${progressValue}%] transition-all`}
      ></div>

      <div className="flex items-center relative w-full mt-5 mx-auto md:mt-0 sm:w-10/12 md:w-5/12">
        <input
          type="text"
          placeholder="Search for products"
          className="py-2 px-4 rounded-l-full outline-none w-full"
          readOnly={isSideBar ? true : false}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          className="py-2 px-3 bg-sky-800 text-2xl rounded-r-full text-white"
          onClick={() => getGeminiSearch(searchQuery)}
        >
          <IoSearch />
        </button>

        {searchSuggestions.length > 0 && (
          <ul className="absolute top-full rounded m-1 py-2 w-[90%] bg-white z-20">
            {searchSuggestions.map((suggestion, i) => (
              <li
                key={i}
                className="px-4 py-1.5 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  getGeminiSearch(suggestion);
                  setSearchQuery(suggestion);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
export default SearchBar;
