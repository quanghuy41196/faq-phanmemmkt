import { IBanner, MktPaginationResponse } from "../interface";
import fetchBase, { fetchBaseParams } from "./fetchBase";

const getFetchAllBanner = async ({
  ...rest
}: Omit<fetchBaseParams, "url">) => {
  const data = await fetchBase<MktPaginationResponse<IBanner>>({
    url: "banner/getall",
    ...rest,
  });
  return data;
};

export default getFetchAllBanner;
