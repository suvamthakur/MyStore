import { useParams } from "react-router-dom";
import { useGetProductInfo } from "../utils/hooks/useGetProductInfo";
import { useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import { useState } from "react";
import ReviewsContainer from "./ReviewsContainer";
import SimilarProductsContainer from "./SimilarProductsContainer";

const ProductPage = () => {
  const productInfo = useSelector((store) => store.product.productInfo);

  const [currImg, setCurrImg] = useState(0);
  const [isOutline, setIsOutline] = useState(0);

  const params = useParams();
  useGetProductInfo(params.id);

  // When ever this component re-rendering. Scrolling to top
  window.scroll({ top: 0, behavior: "smooth" });

  if (productInfo) {
    const { images, reviews, category } = productInfo;

    return (
      <div>
        <div className="flex flex-col md:flex-row bg-white p-2 lg:p-4">
          <div className="mr-2 w-16 md:w-24 flex items-center h-16 md:block my-2 md:my-0">
            {images.map((url, i) => (
              <img
                src={url}
                alt=""
                key={i}
                className={`w-full h-full my-1 mr-1 rounded-lg p-1 border outline outline-2  border-zinc-400 ${
                  isOutline === i ? " outline-sky-900" : "outline-transparent"
                }`}
                onMouseEnter={() => {
                  setCurrImg(i);
                  setIsOutline(i);
                }}
                loading="eager"
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="w-full sm-[90%] md:w-6/12">
              <div className="w-full border border-zinc-200 h-[350px] md:h-[450px] flex justify-center">
                <img
                  src={images[currImg]}
                  alt=""
                  className="h-full p-1 border-zinc-300 object-cover"
                />
              </div>
            </div>
            <ProductDetails productData={productInfo} />
          </div>
        </div>

        <ReviewsContainer reviews={reviews} />
        <SimilarProductsContainer category={category} />
      </div>
    );
  }
};
export default ProductPage;
