import { IPost, MktPaginationResponse } from "../interface";
import fetchBase, { fetchBaseParams } from "./fetchBase";

const getFetchAllPost = async ({ ...rest }: Omit<fetchBaseParams, "url">) => {
  const data = await fetchBase<MktPaginationResponse<IPost>>({
    url: "post/byboth",
    ...rest,
  });
  return data;
};

export default getFetchAllPost;
