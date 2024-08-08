import { Link } from "react-router-dom";
import CategorySideBar from "./CategorySideBar";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "./SubHeader";
import SearchBar from "./SearchBar";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { IoCart } from "react-icons/io5";
import { clearCart } from "../utils/store/cartSlice";
import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";

const Header = () => {
  const dispatch = useDispatch();
  const [userPopUp, setUserPopUp] = useState(false);

  const user = useSelector((store) => store.user);
  const isSideBar = useSelector((store) => store.app.isSideBar);
  const cartItems = useSelector((store) => store.cart.cartItems);
  const loginPopUp = useSelector((store) => store.app.loginPopUp);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // sucess
      })
      .catch((err) => {
        // error
      });

    dispatch(clearCart());
  };

  return (
    <div className="bg-sky-950">
      <div className="px-2.5 py-3 sm:px-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <Link to="/">
          <div className="text-white font-semibold text-2xl">MyStore</div>
        </Link>

        <SearchBar />

        <div className="flex items-center absolute right-1 sm:right-3 top-3 md:relative md:top-0 md:right-0">
          <Link to={"/cart"}>
            <div className="flex items-center text-white mr-4 sm:mr-8">
              <div className="relative mr-2.5">
                <div className="absolute -top-3 left-3 px-2 rounded-full font-bold bg-black flex items-center justify-center">
                  {cartItems && cartItems.length}
                </div>
                <IoCart className="text-2xl sm:text-3xl" />
              </div>
              <button className="text-bs sm:text-lg font-semibold">Cart</button>
            </div>
          </Link>

          {user ? (
            <div
              className="w-9 cursor-pointer mr-1.5 sm:mr-0"
              onClick={() => setUserPopUp(!userPopUp)}
            >
              <img src={user.photoURL} alt="" className="w-full rounded-full" />
            </div>
          ) : (
            <Link to={"/login"}>
              <div className="mr-2 relative">
                <button className="text-white font-semibold border px-2 py-1 sm:px-3 sm:py-1.5 rounded-md">
                  Login
                </button>
                {loginPopUp && !user && (
                  <div className="absolute top-full bg-emerald-600 mt-3 px-5 py-2 -left-2 animate-bounce">
                    <IoMdArrowDropup className="absolute -top-5 text-4xl text-emerald-600" />
                    <span className="text-white font-semibold">Login!</span>
                  </div>
                )}
              </div>
            </Link>
          )}

          {userPopUp && user && (
            <div className="w-[70vw] md:w-max bg-sky-700 text-gray-200 font-semibold rounded absolute top-full right-0 mt-2 px-3 py-2 z-20">
              <p>{user.displayName}</p>
              <p className="my-1">{user.email}</p>
              <button
                className="bg-gray-200 w-full rounded py-1.5 mt-1 text-sky-700"
                onClick={() => handleSignOut()}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <SubHeader />

      {isSideBar && <CategorySideBar />}
    </div>
  );
};
export default Header;
