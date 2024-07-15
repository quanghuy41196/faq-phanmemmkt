import { sendFormData } from "@/helper/functions";
import {
  IBanner,
  IFormBanner,
  IFormUpdate,
  MktPaginationResponse,
} from "../interface";
import http from "./httpClient";
import { headersFormData } from "@/config";

export const bannerApi = {
  queryKey: "banner",

  getAll: async (params?: any) => {
    return await http.get<any, MktPaginationResponse<IBanner>>(
      `${bannerApi.queryKey}/getall`,
      {
        params: params ?? {},
      }
    );
  },

  create: async (payload: IFormBanner) => {
    const formdata = sendFormData(payload);
    return await http.post<any, IBanner>(
      `${bannerApi.queryKey}/create`,
      formdata,
      headersFormData
    );
  },

  update: async ({id, payload}: IFormUpdate<IFormBanner>) => {
    const formdata = sendFormData(payload);
    return await http.put<any, IBanner>(
      `${bannerApi.queryKey}/update/${id}`,
      formdata,
      headersFormData
    );
  },

  delete: async (id: string) => {
    return await http.delete<any, any>(`${bannerApi.queryKey}/delete/${id}`);
  },
};
