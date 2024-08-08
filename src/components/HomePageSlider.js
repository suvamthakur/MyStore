import { useEffect, useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const HomePageSlider = () => {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e0e3dbc99b6b1d83.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e3643f4ecf26b682.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d52d4bda2eb2c7bc.jpeg?q=20",
  ];
  const [isActive, setIsActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      handleClick("next");
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  const handleClick = (btn) => {
    if (btn === "prev") {
      setIsActive(isActive === 0 ? images.length - 1 : isActive - 1);
    } else {
      setIsActive((isActive + 1) % images.length);
    }
  };

  const handleImageClick = () => {
    if (isActive === 1) {
      navigate("/products/search?c=smartphones");
    } else {
      navigate("/products/earch?c=laptops");
    }
  };

  return (
    <div className="relative mt-3 cursor-pointer">
      <RiArrowLeftSLine
        className="absolute bg-white h-[30%] text-3xl md:h-[40%] md:text-4xl left-0 top-[50%] translate-y-[-50%] rounded-r"
        onClick={() => handleClick("prev")}
      />
      <div className="w-full" onClick={() => handleImageClick()}>
        <img
          src={images[isActive]}
          alt=""
          className="w-full h-36 md:h-full object-cover"
          loading="eager"
        />
      </div>
      <RiArrowRightSLine
        className="absolute bg-white h-[30%] text-3xl md:h-[40%] md:text-4xl right-0 top-[50%] translate-y-[-50%] rounded-l"
        onClick={() => handleClick("next")}
      />
    </div>
  );
};
export default HomePageSlider;
