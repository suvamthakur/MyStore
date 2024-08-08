import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  addDiscountFilter,
  removeDiscountFilter,
} from "../utils/store/productSlice";

const DiscountSection = () => {
  const dispatch = useDispatch();
  const [showDiscount, setShowDiscount] = useState(false);

  const handleCheckbox = (value, isChecked) => {
    if (isChecked) {
      dispatch(addDiscountFilter(parseInt(value)));
    } else {
      dispatch(removeDiscountFilter(parseInt(value)));
    }
  };

  return (
    <div className="p-3 border-b">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShowDiscount(!showDiscount)}
      >
        <h1 className="font-semibold">DISCOUNT</h1>
        {showDiscount ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {showDiscount && (
        <div className="mx-1 my-2">
          <div className="flex items-center my-2">
            <input
              type="checkbox"
              value={15}
              id=""
              onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}
            />
            <p className="ml-2">15% or more</p>
          </div>

          <div className="flex items-center my-2">
            <input
              type="checkbox"
              value={30}
              id=""
              onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}
            />
            <p className="ml-2">30% or more</p>
          </div>

          <div className="flex items-center my-2">
            <input
              type="checkbox"
              value={45}
              id=""
              onChange={(e) => handleCheckbox(e.target.value, e.target.checked)}
            />
            <p className="ml-2">45% or more</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default DiscountSection;
