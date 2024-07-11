"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const listBanner = [
  {
    src: "https://phanmemmkt.vn/wp-content/uploads/2024/04/Banner_slide_phan_mem_MKT_option2_10-4-2024-1.webp",
  },

  {
    src: "https://phanmemmkt.vn/wp-content/uploads/2024/04/Banner_slide_Big_update_23-4-2024-1.webp",
  },

  {
    src: "https://phanmemmkt.vn/wp-content/uploads/2024/04/Slider_banner_MKT_Page_10-4-2024-1-1.webp",
  },

  {
    src: "https://phanmemmkt.vn/wp-content/uploads/2024/04/Banner_Email-1.webp",
  },
];

const Banner = () => {
  return (
    <Swiper
      className="h-[600px]"
      loop
      effect="fade"
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
      }}
      modules={[Pagination, Autoplay, EffectFade]}
    >
      {listBanner?.map((item, index) => {
        return (
          <SwiperSlide className="w-full !h-full" key={index}>
            <Image
              width={1920}
              height={600}
              src={item?.src}
              alt="ss"
              className="w-full h-full"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banner;
