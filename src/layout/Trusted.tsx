"use client";
import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const listTrusted = [
  "https://phanmemmkt.vn/wp-content/uploads/2024/04/Artboard-20@2x-1024x512.png",
  "https://phanmemmkt.vn/wp-content/uploads/2024/04/Artboard-24_1@2x.png",
  "https://phanmemmkt.vn/wp-content/uploads/2024/04/Artboard-24@2x.png",
  "https://phanmemmkt.vn/wp-content/uploads/2024/04/Artboard-17@2x.png",
  "https://phanmemmkt.vn/wp-content/uploads/2024/04/Artboard-16@2x.png",
  "https://phanmemmkt.vn/wp-content/uploads/2024/04/Artboard-14@2x.png",
];

const Trusted = () => {
  return (
    <div className="bg-white shadow-modal px-10 container rounded-[30px] py-6 pb-10 flex flex-col items-center translate-y-1/2 relative z-10 max-sm:hidden">
      <h2 className="text-xl text-[#0e206d] font-medium text-center w-fit relative pb-2">
        Được tin dùng bởi
        <span className="block w-1/3 bg-[#0e206d] h-1 absolute left-1/2 -translate-x-1/2 bottom-0"></span>
      </h2>

      <div className="mt-5 max-w-full">
        <Swiper
          modules={[Autoplay]}
          breakpoints={{
            1240: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 4,
            },
            620: {
              slidesPerView: 3,
            },
          }}
          loop
          autoplay={{
            delay: 2500,
          }}
          slidesPerView={1}
          spaceBetween={28}
          className="h-[110px]"
        >
          {listTrusted?.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                src={item}
                alt="ss"
                width={200}
                height={110}
                className="h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Trusted;
