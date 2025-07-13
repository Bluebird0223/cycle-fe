import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import banner4 from "../../../assets/images/Banners/banner1.jpg";
import nbanner2 from "../../../assets/images/Banners/banner2.jpg";
import nbanner3 from "../../../assets/images/Banners/banner3 copy.jpg";
import nbanner4 from "../../../assets/images/Banners/banner4.jpg";

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  );
};

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  );
};

export const Nxt = ({ onClick, top = "top-28" }) => {
  return (
    <div
      onClick={onClick}
      className={` h-20 w-8 rounded-s-lg items-center justify-center z-10 hidden md:flex absolute ${top} cursor-pointer right-0`}
    >
      <ArrowForwardIosIcon className="scale-80 mr-3" />
    </div>
  );
};

export const Pre = ({ onClick, top = "top-28" }) => {
  return (
    <div
      onClick={onClick}
      className={` ps-2  h-20 w-8 rounded-e-lg items-center justify-center z-10 hidden md:flex absolute ${top} cursor-pointer left-0`}
    >
      <ArrowBackIosIcon className="scale-80 ml-3" />
    </div>
  );
};

const Banner = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Pre top="top-36" />,
    nextArrow: <Nxt top="top-36" />,
  };

  const banners = [banner4, nbanner3, nbanner2, nbanner4];

  return (
    <>
      <section className="h-44 sm:h-96 w-full mt-1 sm:m-0 shadow relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <img
              draggable="false"
              className="h-96 sm:h-96 w-full object-cover"
              src={el || "/placeholder.svg"}
              alt="banner"
              key={i}
            />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;