import { LiaStarSolid } from "react-icons/lia";
import { getCalculatedAmount } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/store/cartSlice";
import { addLoginPopUp } from "../utils/store/appSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ productData }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    warrantyInformation,
    shippingInformation,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    availabilityStatus,
  } = productData;

  const [originalPrice, discount] = getCalculatedAmount(
    price,
    discountPercentage
  );

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(productData));
      notify();
    } else {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });

      // Showing loding pop up for 2 sec
      dispatch(addLoginPopUp());

      setTimeout(() => {
        dispatch(addLoginPopUp());
      }, 2000);
    }
  };

  const notify = () =>
    toast.success("Added to Cart", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return (
    <div className=" mt-2 md:mt-0 ml-1 md:ml-2 lg:ml-4 w-full sm:w-[90%] md:w-6/12">
      <h1 className="font-semibold text-xl lg:text-2xl">{title}</h1>
      <p className="text-zinc-500 font-semibold text-sm">{brand}</p>

      <div className="flex my-3">
        <div
          className={`rounded-md px-1 lg:px-1.5 py-0.5 text-white text-xs lg:text-sm font-semibold flex items-center w-max 
            ${rating >= 4 ? "bg-emerald-600" : "bg-orange-400"}`}
        >
          {Math.round(rating * 10) / 10} <LiaStarSolid className="ml-0.5" />
        </div>
        <p className="font-semibold text-zinc-500 text-sm lg:text-base ml-2">
          {reviews.length + " Reviews"}
        </p>
      </div>

      <div>
        <p className="font-semibold text-emerald-600 text-sm lg:text-base">
          Special price
        </p>
        <div className="flex items-center">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            {"₹ " + originalPrice.toLocaleString("en-IN")}
          </h1>
          <p className="ml-3 text-zinc-500 line-through">
            {"₹" + Math.round(price * 85).toLocaleString("en-IN")}
          </p>
          <p className="ml-3 text-emerald-600 font-semibold">
            {discount + "% off"}
          </p>
        </div>
      </div>

      <div className="my-3">
        <p className="mb-3 lg:text-lg font-normal">{description}</p>
        <div className="font-semibold text-sky-800 flex text-sm lg:text-base">
          <span className="mr-4">{warrantyInformation}</span>
          <li type="disc">
            <span>{returnPolicy}</span>
          </li>
        </div>
      </div>

      <div className="border rounded-md -ml-1.5 md:ml-0">
        <p className="bg-zinc-200 font-semibold p-2">
          {"Minimum order quantiity: " + minimumOrderQuantity}
        </p>
        <div className="px-2 py-1">
          <p
            className={
              "lg:text-xl font-semibold " +
              (availabilityStatus === "Out of Stock"
                ? "text-red-600"
                : "text-emerald-700")
            }
          >
            {availabilityStatus}
          </p>
          <p className="text-sky-800 my-1">{shippingInformation}</p>

          {!(availabilityStatus === "Out of Stock") && (
            <div className="my-2">
              <button
                className="bg-emerald-600 w-40 py-2 font-semibold lg:text-lg text-white rounded hover:bg-emerald-700"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </button>
              <button className="bg-sky-900 w-40 py-2 ml-1.5 font-semibold lg:text-lg text-white rounded hover:bg-sky-950">
                Buy Now
              </button>
              <ToastContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
