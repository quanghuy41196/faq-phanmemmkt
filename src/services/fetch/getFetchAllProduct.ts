import { IProduct, MktPaginationResponse } from "../interface";
import fetchBase, { fetchBaseParams } from "./fetchBase";

const getFetchAllProduct = async ({
  ...rest
}: Omit<fetchBaseParams, "url">) => {
  const data = await fetchBase<MktPaginationResponse<IProduct>>({
    url: "product/getall",
    ...rest,
  });
  return data;
};

export default getFetchAllProduct;
