import { ICategory, MktPaginationResponse } from "../interface";
import fetchBase, { fetchBaseParams } from "./fetchBase";

const getFetchAllCategory = async ({
  ...rest
}: Omit<fetchBaseParams, "url">) => {
  const data = await fetchBase<MktPaginationResponse<ICategory>>({
    url: "category/getall",
    ...rest,
  });
  return data;
};

export default getFetchAllCategory;
