import { headersFormData } from "@/config";
import { sendFormData } from "@/helper/functions";
import {
  IFormProduct,
  IFormUpdate,
  IProduct,
  ISearchProduct,
  MktPaginationResponse,
} from "../interface";
import http from "./httpClient";

export const productsApi = {
  queryKey: "product",

  getAll: async (params?: ISearchProduct) => {
    return await http.get<any, MktPaginationResponse<IProduct>>(
      `${productsApi.queryKey}/getall`,
      {
        params: params ?? {},
      }
    );
  },

  create: async (payload: IFormProduct) => {
    const formdata = sendFormData(payload);
    return await http.post<any, IProduct>(
      `${productsApi.queryKey}/create`,
      formdata,
      headersFormData
    );
  },

  update: async ({ id, payload }: IFormUpdate<IFormProduct>) => {
    const formdata = sendFormData(payload);
    return await http.put<any, IProduct>(
      `${productsApi.queryKey}/update/${id}`,
      formdata,
      headersFormData
    );
  },

  delete: async (id: string) => {
    return await http.delete<any, any>(`${productsApi.queryKey}/delete/${id}`);
  },
};
