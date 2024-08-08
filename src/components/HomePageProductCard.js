import { Link } from "react-router-dom";
import { getCalculatedAmount } from "../utils/helper";
import { useMemo } from "react";

const HomePageProductCard = ({ productData, category }) => {
  const { id, price, title, images, discountPercentage } = productData;

  const [originalPrice, discount] = useMemo(
    () => getCalculatedAmount(price, discountPercentage),
    [price, discountPercentage]
  );

  return (
    <Link to={"/product/" + id}>
      <div className="w-48 mr-2 border hover:shadow-xl bg-gray-100">
        <div className="w-full flex justify-center h-56 ">
          <img
            loading="eager"
            src={images[0]}
            alt=""
            className="h-full object-cover pt-3 px-3"
          />
        </div>

        <div className="text-center p-2">
          <p>{title.length > 18 ? title.substr(0, 18) + "..." : title}</p>

          {category === "Top Deals" && (
            <p className="font-semibold">{"Up to " + discount + "% off"}</p>
          )}

          {category === "Best of Smartphones" && (
            <p className="font-semibold">
              {"₹ " + originalPrice.toLocaleString("en-IN")}
            </p>
          )}

          {(category === "Top Deals On Grocery" ||
            category === "Similar Products") && (
            <p className="font-semibold">
              {"₹ " + originalPrice.toLocaleString("en-IN")}

              <span className="font-semibold ml-2 text-emerald-600">
                {discount + "% off"}
              </span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default HomePageProductCard;
