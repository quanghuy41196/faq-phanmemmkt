import { getFetchAllBanner } from "@/services/fetch";
import { use } from "react";
import BannerList from "./BannerList";


const Banner = () => {
  const listBanner = use(getFetchAllBanner({
    search: {
      active: true
    }
  }))

  return (
   <BannerList data={listBanner?.items ?? []}/>
  );
};

export default Banner;
