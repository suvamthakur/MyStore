import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSideBar } from "../utils/store/appSlice";

const CategorySideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCLick = (category) => {
    dispatch(toggleSideBar());
    navigate("/products/search?c=" + category);
  };

  return (
    <div className="px-4 pb-2 w-full lg:w-3/12 h-[85vh] overflow-y-scroll absolute border-t-2 border-sky-800 bg-sky-900 z-10">
      <ul>
        <li className="mb-2 mt-5 text-xl font-semibold text-sky-200">
          Men's Fashion
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value="mens-shirts"
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Shirts
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"mens-shoes"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Shoes
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"mens-watches"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Watches
        </li>
      </ul>

      <ul>
        <li className="mb-2 mt-5 text-xl font-semibold text-sky-200">
          Women's Fashion
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"womens-dresses"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Dresses
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"womens-jewellery"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Jewellery
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"womens-shoes"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Shoes
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"womens-watches"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Watches
        </li>
      </ul>

      <ul>
        <li className="mb-2 mt-5 text-xl font-semibold text-sky-200">
          Furnitue, Decorarion, Kitchen
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"furniture"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Furniture
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"home-decoration"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Home Decorations
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value={"kitchen-accessories"}
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Kitchen Accessories
        </li>
      </ul>

      <ul>
        <li className="mb-2 mt-5 text-xl font-semibold text-sky-200">
          Mobile, Laptop, Sports
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value="smartphones"
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Mobiles
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value="laptops"
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Laptops
        </li>
        <li
          className="text-sky-100 py-2 px-3 cursor-pointer hover:bg-sky-800"
          data-value="sports-accessories"
          onClick={(e) => handleCLick(e.target.getAttribute("data-value"))}
        >
          Sports accessories
        </li>
      </ul>
    </div>
  );
};
export default CategorySideBar;
