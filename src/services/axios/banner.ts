import { headersFormData } from "@/config";
import { sendFormData } from "@/helper/functions";
import {
  IBanner,
  IFormBanner,
  IFormUpdate,
  MktPaginationResponse,
} from "../interface";
import http from "./httpClient";

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
    const isFormData = Object.hasOwn(payload, 'file')
    const formdata = isFormData ? sendFormData(payload) : payload;
    return await http.put<any, IBanner>(
      `${bannerApi.queryKey}/update/${id}`,
      formdata,
      isFormData ? headersFormData : {}
    );
  },

  delete: async (id: string) => {
    return await http.delete<any, any>(`${bannerApi.queryKey}/delete/${id}`);
  },
};
