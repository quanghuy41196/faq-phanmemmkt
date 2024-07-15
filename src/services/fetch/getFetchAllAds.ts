import { IAds, MktPaginationResponse } from "../interface";
import fetchBase, { fetchBaseParams } from "./fetchBase";

const getFetchAllAds = async ({
  ...rest
}: Omit<fetchBaseParams, "url">) => {
  const data = await fetchBase<MktPaginationResponse<IAds>>({
    url: "ads/getall",
    ...rest,
  });
  return data;
};

export default getFetchAllAds;
