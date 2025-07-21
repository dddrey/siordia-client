import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PhoneFrame from "@/shared/components/ui/phone-frame";
import {
  useAuthNavigation,
  useCurrentSlide,
} from "@/shared/hooks/use-auth-navigation";

const SecondStep = () => {
  const { setCurrentSlide, setTotalSlides, setStepValid } = useAuthNavigation();
  const currentSlide = useCurrentSlide();

  const slides = [
    {
      title: "Выберите тему которую хочешь изучить",
      image: "/images/auth/topic.jpg",
    },
    {
      title: "Смотри уроки по выбранной теме",
      image: "/images/auth/lesson.jpg",
    },
    {
      title: "Покупай подписку и смотри весь контент",
      image: "/images/auth/subscription.jpg",
    },
  ];

  // Устанавливаем количество слайдов при монтировании
  useEffect(() => {
    setTotalSlides(slides.length);
    setCurrentSlide(0);
    setStepValid(true);
  }, [setTotalSlides, setCurrentSlide, setStepValid]);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Индикатор прогресса слайдов */}
      <div className="flex justify-center absolute top-safe-area-content left-0 w-full items-center py-5 px-4 z-10">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-10 bg-textAccent" // активный слайд - зеленый и широкий
                  : index < currentSlide
                    ? "w-2 bg-textAccent opacity-60" // пройденные слайды - зеленые но менее яркие
                    : "w-2 bg-gray-600 opacity-40" // непройденные слайды - серые
              }`}
            />
          ))}
        </div>
      </div>

      {/* Контент слайдов */}
      <div className="flex-1">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          className="w-full h-full"
          onSlideChange={handleSlideChange}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex-1 flex flex-col h-full items-center justify-center gap-4">
                {/* Текст над телефоном */}
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-center text-textPrimary leading-tight max-w-[320px]">
                    {slide.title}
                  </h1>
                </div>

                {/* PhoneFrame с изображением */}
                <div className="flex items-center justify-center px-4">
                  <PhoneFrame className="max-h-full">
                    <img
                      src={slide.image}
                      className="w-full h-full object-fill rounded-lg"
                      alt="screen"
                    />
                  </PhoneFrame>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SecondStep;
