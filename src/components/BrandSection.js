import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Brand from "./Brand";

const BrandSection = ({ brands }) => {
  const [showBrands, setShowBrands] = useState(true);

  // brands can be ["Rolex", "Titan", "Rolex", "Longiness", "Titan", "Rolex"]
  const brandNames = brands.filter((brand, i) => brands.indexOf(brand) === i);

  // now brandNames ["Rolex", "Titan", "Longiness"]

  return (
    <div className="p-3 border-b">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShowBrands(!showBrands)}
      >
        <h1 className="font-semibold">BRAND</h1>
        {showBrands ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {showBrands && (
        <div className="mx-1 my-2">
          {brandNames.map((brand, i) => (
            <Brand key={i} brandName={brand} />
          ))}
        </div>
      )}
    </div>
  );
};
export default BrandSection;
