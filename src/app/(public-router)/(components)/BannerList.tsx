"use client";
import { IBanner } from "@/services/interface";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BannerListProps {
  data: IBanner[];
}

const BannerList: FC<BannerListProps> = ({ data }) => {
  return (
    <Swiper
      className="min-[2000px]:h-[760px] xl:h-[600px] max-xl:h-[450px] max-lg:h-[400px] max-md:h-full"
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
      {data?.map((item, index) => {
        return (
          <SwiperSlide className="w-full !h-full" key={index}>
            <Link href={item?.link} className="w-full h-full" target="_blank">
              <Image
                width={1920}
                height={600}
                src={item?.image ?? ""}
                alt={item?.link}
                className="w-full h-full"
              />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default BannerList;
