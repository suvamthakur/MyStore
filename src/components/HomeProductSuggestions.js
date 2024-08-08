import {
  HomeSuggestionBigCard,
  HomeSuggestionCard,
} from "./HomeSuggestionCard";

const HomeProductSuggestions = ({ products, category }) => {
  if (products) {
    return (
      <div className="px-3 py-4 bg-gray-50 border">
        <h1 className="text-[22px] mb-3 font-bold text-sky-900">{category}</h1>
        <div className="grid lg:grid-cols-2">
          <div className="grid grid-cols-2 grid-rows-2">
            {/* This will slice first 3 element and then it will map() on it */}
            {products.slice(0, 4).map((product, i) => (
              <HomeSuggestionCard key={i} productData={product} />
            ))}
          </div>
          <div>
            <HomeSuggestionBigCard productData={products[4]} />
          </div>
        </div>
      </div>
    );
  }
};
export default HomeProductSuggestions;
