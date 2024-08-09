import { useEffect, useMemo, useState } from "react";
import { getCalculatedAmount } from "../utils/helper";
import { useDispatch } from "react-redux";
import {
  addDiscounts,
  addSubTotalsWithoutDiscount,
  removeCartItem,
} from "../utils/store/cartSlice";

const CartProduct = ({ index, product }) => {
  const dispatch = useDispatch();
  const [subtotal, SetSubtotal] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  const {
    id,
    title,
    brand,
    price,
    discountPercentage,
    availabilityStatus,
    minimumOrderQuantity,
    images,
  } = product;

  const [originalPrice, discount] = useMemo(
    () => getCalculatedAmount(price, discountPercentage),
    [price, discountPercentage]
  );

  // setting the minimum order quantitty of the product
  useEffect(() => {
    setProductQuantity(minimumOrderQuantity);
  }, []);

  // modifying the subtotal, discount for the particular product
  useEffect(() => {
    SetSubtotal(productQuantity * originalPrice);
    dispatch(
      addSubTotalsWithoutDiscount({
        index: index,
        price: productQuantity * Math.round(price * 85),
      })
    );

    dispatch(
      addDiscounts({
        index: index,
        discount:
          productQuantity * Math.round(price * 85) -
          productQuantity * originalPrice,
      })
    );
  }, [productQuantity]);

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (minimumOrderQuantity <= productQuantity) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="flex md:px-2 py-5 border-b ">
      <div>
        <div className="w-36 h-36 flex justify-center">
          <img src={images[0]} alt="" className="h-full p-1" />
        </div>
        <div className="text-center mt-1">
          <button
            className="border border-zinc-300 w-8 py-1 font-semibold"
            onClick={() => decreaseQuantity()}
          >
            -
          </button>
          <input
            type="number"
            className="border border-zinc-300 outline-none w-14 text-center py-1 font-semibold mx-1"
            value={productQuantity}
            onChange={(e) => {
              if (!(e.target.value < minimumOrderQuantity)) {
                setProductQuantity(e.target.value);
              }
            }}
          />
          <button
            className="border border-zinc-300 w-8 py-1 font-semibold"
            onClick={() => increaseQuantity()}
          >
            +
          </button>
        </div>
      </div>

      <div className="ml-2 md:ml-4 w-full relative">
        <p
          className="absolute -top-5 right-5 font-bold text-red-600 cursor-pointer text-sm"
          onClick={() => handleRemoveCartItem()}
        >
          REMOVE
        </p>
        <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
        <p className="text-zinc-500 font-semibold text-sm md:my-1">{brand}</p>
        {availabilityStatus === "Out of stock" && (
          <p className="text-sm md:text-lg font-semibold text-red-600 my-2">
            {availabilityStatus}
          </p>
        )}

        <div className="flex flex-col md:flex-row md:items-center mt-1 md:mt-2">
          <h1 className="text-xl md:text-2xl font-semibold">
            {"₹ " + originalPrice.toLocaleString("en-IN")}
          </h1>
          <div className="flex items-center text-sm md:text-base">
            <p className="md:ml-3 text-zinc-500 line-through">
              {"₹" + Math.round(price * 85).toLocaleString("en-IN")}
            </p>
            <p className="ml-3 text-emerald-600 font-semibold">
              {discount + "% off"}
            </p>
          </div>
        </div>

        <p className="mt-1.5 md:mt-3 font-semibold text-sm md:text-base">
          {"Minimum order quantiity: " + minimumOrderQuantity}
        </p>

        <p className="absolute mt-2 md:mt-0 md:bottom-1 md:right-5 font-semibold text-sm md:text-lg ">
          Subtotal ({productQuantity} items): ₹
          {subtotal.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};
export default CartProduct;
