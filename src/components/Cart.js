import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";

const Cart = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const subtotals = useSelector((store) => store.cart.subtotals);
  const discounts = useSelector((store) => store.cart.discounts);

  const totalAmount = subtotals.reduce((acc, curr) => acc + curr, 0);
  const totalDiscount = discounts.reduce((acc, curr) => acc + curr, 0);

  // If user is not logged in. Go back to the previous page
  useEffect(() => {
    if (!user) {
      navigate(-1);
    }
  }, []);

  return (
    <div className="m-1.5 md:m-4 flex flex-col lg:flex-row">
      <div className="bg-white lg:w-9/12">
        <h1 className="text-2xl font-semibold px-4 pt-4">Cart</h1>
        <hr className="my-3" />

        {cartItems.length === 0 ? (
          <div className="text-center font-semibold text-2xl py-6">
            <p>Your cart is empty!</p>

            <Link to="/">
              <button className="my-4 text-lg border px-4 py-1.5 bg-green-700 text-white rounded">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white md:px-2">
            {cartItems.map((item, i) => (
              <CartProduct key={i} index={i} product={item} />
            ))}
          </div>
        )}
      </div>

      <div className="lg:w-3/12 mt-1.5 lg:mt-0 lg:ml-2 bg-white sticky top-2 h-max">
        <h1 className="font-semibold text-lg px-6 pt-4">PRICE DETAILS</h1>
        <hr className="my-4" />

        <div className="mx-6 font-semibold text-lg">
          <div className="flex items-center justify-between">
            <span>{`Price (${cartItems.length} items):`}</span>
            <span>{"₹" + totalAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center justify-between my-3">
            <span>Dicount</span>
            <span className="text-green-600">
              {"- ₹" + totalDiscount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr />

          <div className="flex items-center justify-between my-3">
            <span>Total Amount</span>
            <span className="text-xl">
              ₹{(totalAmount - totalDiscount).toLocaleString("en-IN")}
            </span>
          </div>

          <hr />

          <p className="text-base my-3">
            You will save{" "}
            <span className="text-green-600">
              ₹{totalDiscount.toLocaleString("en-IN")}
            </span>{" "}
            on this order
          </p>
        </div>
        <button className="w-11/12 block mx-auto my-3 py-2 rounded font-semibold bg-sky-900 text-white">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};
export default Cart;
