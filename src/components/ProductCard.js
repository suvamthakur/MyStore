import { LiaStarSolid } from "react-icons/lia";
import { getCalculatedAmount } from "../utils/helper";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const ProductCard = ({ productData }) => {
  const {
    id,
    title,
    images,
    price,
    discountPercentage,
    rating,
    brand,
    availabilityStatus,
  } = productData;

  const [originalPrice, discount] = useMemo(
    () => getCalculatedAmount(price, discountPercentage),
    [price, discountPercentage]
  );

  return (
    <div className="w-[168px] sm:w-52 md:w-64 ml-2 md:ml-3 mt-2.5 md:mt-4 cursor-pointer shadow md:shadow-md hover:shadow-xl">
      <Link to={"/product/" + id}>
        <div className="w-full flex justify-center h-40 md:h-56 ">
          <img
            loading="eager"
            src={images[0]}
            alt=""
            className="h-full object-cover pt-3 md:px-3"
          />
        </div>

        <div className="p-2.5 md:p-4">
          <p className="md:text-lg font-semibold">{title}</p>
          <p className="text-zinc-500 font-semibold text-sm">{brand}</p>

          <div className="flex items-center my-1.5">
            <div
              className={`rounded-md px-1.5 py-0.5 text-white text-xs font-semibold flex items-center w-max 
                ${rating >= 4 ? "bg-emerald-600" : "bg-orange-400"}`}
            >
              {Math.round(rating * 10) / 10} <LiaStarSolid className="ml-0.5" />
            </div>
            <p className="ml-2 font-semibold text-sm md:text-base">
              {availabilityStatus}
            </p>
          </div>

          <div className="font-semibold md:text-lg flex flex-col md:flex-row md:items-center">
            <span>{"₹ " + originalPrice.toLocaleString("en-IN")}</span>
            <div>
              <span className="md:ml-2 font-normal text-sm text-zinc-500 line-through">
                {"₹" + Math.round(price * 85).toLocaleString("en-IN")}
              </span>
              <span className="font-semibold ml-2 text-emerald-600 text-sm">
                {discount + "% off"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
