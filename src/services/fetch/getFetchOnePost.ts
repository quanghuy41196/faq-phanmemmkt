import { joinPathParent } from "@/helper/functions";
import { IPost } from "../interface";
import fetchBase, { fetchBaseParams } from "./fetchBase";

const getFetchOnePost = async ({ ...rest }: Omit<fetchBaseParams, "url">) => {
  const { slug, ...spread } = rest?.search ?? {};
  if(!slug) return undefined
  const data = await fetchBase<IPost>({
    url: joinPathParent("post", "get", slug),
    ...rest,
    search: spread
  });
  return data;
};

export default getFetchOnePost;
