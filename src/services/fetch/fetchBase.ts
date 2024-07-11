import { joinPathParent } from "@/helper/functions";
import { BASE_URL } from "../axios/httpClient";

export interface fetchBaseParams {
  url: string;
  initResquest?: RequestInit;
  search?: any;
}

// Định nghĩa các chữ ký hàm cho các trường hợp với và không có isPrimitive
async function fetchBase<T>(
  params: fetchBaseParams,
  isPrimitive: boolean
): Promise<Response | undefined>;
async function fetchBase<T>(params: fetchBaseParams): Promise<T | undefined>;

async function fetchBase<T>(
  { url, initResquest, search }: fetchBaseParams,
  isPrimitive?: boolean
) {
  const init: RequestInit = {
    next: {
      revalidate: 0,
    },
    ...(initResquest ?? {}),
  };
  let urlApi = new URL(joinPathParent(BASE_URL, "api", url).slice(1));
  if (search) {
    Object.keys(search).forEach(key => urlApi.searchParams.append(key, search[key]))
  }

  try {
    const data = await fetch(urlApi, init);

    if (isPrimitive) {
      return data as Response as unknown as T;
    }
    const jsonData = await data?.json();
    return jsonData as unknown as T;
  } catch {
    return undefined;
  }
}

export default fetchBase;
