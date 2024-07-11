import { headersFormData } from "@/config";
import { sendFormData } from "@/helper/functions";
import {
  ICategory,
  IFormDefault,
  IFormUpdate,
  ISearchCategory,
  MktPaginationResponse,
} from "../interface";
import http from "./httpClient";

export const categoryApi = {
  queryKey: "category",

  getAll: async (params?: ISearchCategory) => {
    return await http.get<any, MktPaginationResponse<ICategory>>(
      `${categoryApi.queryKey}/getall`,
      {
        params: params ?? {},
      }
    );
  },

  create: async (payload: IFormDefault) => {
    const formdata = sendFormData(payload);
    return await http.post<any, ICategory>(
      `${categoryApi.queryKey}/create`,
      formdata,
      headersFormData
    );
  },

  update: async ({ id, payload }: IFormUpdate<IFormDefault>) => {
    const formdata = sendFormData(payload);
    return await http.put<any, ICategory>(
      `${categoryApi.queryKey}/update/${id}`,
      formdata,
      headersFormData
    );
  },

  delete: async (id: string) => {
    return await http.delete<any, any>(`${categoryApi.queryKey}/delete/${id}`);
  },
};
