import { IPost, MktPaginationResponse } from "../interface";
import fetchBase, { fetchBaseParams } from "./fetchBase";

const getFetchSearchAllPost = async ({
  ...rest
}: Omit<fetchBaseParams, "url">) => {
  if (!rest?.search?.title) return;
  const data = await fetchBase<MktPaginationResponse<IPost>>({
    url: "post/byboth",
    ...rest,
  });
  return data;
};

export default getFetchSearchAllPost;
