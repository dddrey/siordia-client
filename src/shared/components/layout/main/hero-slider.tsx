import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import useTelegram from "@/shared/hooks/use-telegram";

interface DefaultSlide {
  type: "default";
  url: string;
  altText: string;
}

interface LinkSlide {
  type: "link";
  url: string;
  altText: string;
  linkText: string;
  link: string;
}

type HeroSlideType = DefaultSlide | LinkSlide;

const slides: HeroSlideType[] = [
  {
    url: "/images/slider/about-me.jpg",
    altText: "про меня",
    link: "/about",
    linkText: "Привет, я Дима! 👋",
    type: "link",
  },
  {
    url: "/images/slider/club.jpg",
    altText: "Футбольная академия",
    link: "/school",
    linkText: "Моя академия 🎓",
    type: "link",
  },
];

export const HeroSlider = () => {
  const { setHapticFeedback } = useTelegram();

  return (
    <div className="relative w-full h-screen rounded-b-[14px] overflow-hidden bg-primary shadow-card-light dark:shadow-card-dark">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
        spaceBetween={8}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-screen h-screen">
              <img
                src={slide.url}
                alt={slide.altText}
                className="object-cover w-full h-screen rounded-[12px]"
              />
              {slide.type === "link" && (
                <Link
                  to={slide.link}
                  onClick={setHapticFeedback}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 font-semibold text-textPrimary bg-primary rounded-[14px] px-5 py-3"
                >
                  {slide.linkText}
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
