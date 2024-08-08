import { useSelector } from "react-redux";
import { useGetProductsByCategory } from "../utils/hooks/useGetProductsByCategory";
import HomePageProductCard from "./HomePageProductCard";

const SimilarProductsContainer = ({ category }) => {
  const categoryProducts = useSelector(
    (store) => store.product.categoryProducts
  );

  useGetProductsByCategory(category);

  const products = categoryProducts[category];

  if (products) {
    return (
      <div className="bg-white mx-2 my-2">
        <div className="p-4">
          <h1 className="font-semibold text-2xl mb-3">Similar Products</h1>

          <div className="flex items-center overflow-x-scroll remove-scrollbar">
            {products.map((product) => (
              <HomePageProductCard
                key={product.id}
                category={"Similar Products"}
                productData={product}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};
export default SimilarProductsContainer;
