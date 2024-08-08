import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPriceFilter } from "../utils/store/productSlice";
import {
  removeGeminiIsPriceUnder,
  removeGeminiPriceFilter,
} from "../utils/store/appSlice";

const PriceSection = ({ maxPrice }) => {
  const dispatch = useDispatch();

  const { isPriceUnder, price } = useSelector(
    (store) => store.app?.geminiFilteredSearch
  );

  const maxPriceSlider = parseInt(maxPrice / 1.5);
  const [currPrice, setCurrPrice] = useState(maxPriceSlider);

  // This useEffect for setting price is needed because when GetPorductsByCategory API is not called because REDUX already had that data, at that that time price isn't getting updated.
  useEffect(() => {
    setCurrPrice(maxPriceSlider);
  }, [maxPriceSlider]);

  useEffect(() => {
    handlePriceFilter();

    // clearing gemini filters
    return () => {
      dispatch(removeGeminiIsPriceUnder());
      dispatch(removeGeminiPriceFilter());
    };
  }, [currPrice, price]);

  const handlePriceFilter = () => {
    if (isPriceUnder) {
      setCurrPrice(price);
      dispatch(addPriceFilter(price));
    } else {
      // If user slide the price filter to the end, then add maxPrice to the priceFilter
      dispatch(
        addPriceFilter(currPrice === maxPriceSlider ? maxPrice : currPrice)
      );
    }
  };

  return (
    <div className="border-b p-3">
      <h1 className="font-semibold mb-1">PRICE</h1>

      <p className="font-semibold">
        ₹{currPrice.toLocaleString("en-IN")}
        {currPrice === maxPriceSlider && "+"}
      </p>
      <input
        className="cursor-pointer w-full"
        type="range"
        min="0"
        max={maxPriceSlider}
        value={currPrice}
        onChange={(e) => setCurrPrice(parseInt(e.target.value))}
      />
    </div>
  );
};
export default PriceSection;
