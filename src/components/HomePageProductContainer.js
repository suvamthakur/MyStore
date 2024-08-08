import Slider from "react-slick";
import HomePageProductCard from "./HomePageProductCard";

// slider settings
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 2,
  variableWidth: true,
};

const HomePageProductContainer = ({ products, category }) => {
  // Checking this because If I refresh when I'm inside productListPage, the store gets empty, then products be undefined here
  if (products) {
    return (
      <div className="px-3 py-4 my-3 bg-gray-50">
        <h1 className="text-[22px] font-semibold mb-3 text-sky-900">
          {category}
        </h1>

        <div className="slider-container">
          <Slider {...settings}>
            {products.map((product) => (
              <HomePageProductCard
                key={product.id}
                category={category}
                productData={product}
              />
            ))}
          </Slider>
        </div>
      </div>
    );
  }
};
export default HomePageProductContainer;
