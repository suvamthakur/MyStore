import { useDispatch, useSelector } from "react-redux";
import {
  addBrandsFilter,
  removeBrandsFromFilter,
} from "../utils/store/productSlice";
import { useEffect, useState } from "react";
import { removeGeminiBrandFilter } from "../utils/store/appSlice";

const Brand = ({ brandName }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const filteredBrand = useSelector(
    (store) => store.app?.geminiFilteredSearch?.brand
  );

  // Tick the checkbox of brand if it matches searched brand
  useEffect(() => {
    if (
      filteredBrand &&
      filteredBrand.toUpperCase() === brandName.toUpperCase()
    ) {
      setIsChecked(true);
    }

    return () => {
      // To update it with new one
      dispatch(removeGeminiBrandFilter());

      // To untick the old checkbox
      if (isChecked === true) {
        setIsChecked(false);
      }
    };
  }, [filteredBrand]);

  useEffect(() => {
    if (isChecked) {
      dispatch(addBrandsFilter(brandName));
    } else {
      dispatch(removeBrandsFromFilter(brandName));
    }
  }, [isChecked]);

  return (
    <div className="flex items-center my-2">
      <input
        type="checkbox"
        value={brandName}
        id=""
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(!isChecked);
        }}
      />
      <p className="ml-2">{brandName}</p>
    </div>
  );
};
export default Brand;
