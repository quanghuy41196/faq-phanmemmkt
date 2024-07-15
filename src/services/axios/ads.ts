import { headersFormData } from "@/config";
import { sendFormData } from "@/helper/functions";
import {
  IAds,
  IFormAds,
  IFormUpdate,
  ISearchAds,
  MktPaginationResponse,
} from "../interface";
import http from "./httpClient";

export const adsApi = {
  queryKey: "ads",

  getAll: async (params?: ISearchAds) => {
    return await http.get<any, MktPaginationResponse<IAds>>(
      `${adsApi.queryKey}/getall`,
      {
        params: params ?? {},
      }
    );
  },

  create: async (payload: IFormAds) => {
    const formdata = sendFormData(payload);
    return await http.post<any, IAds>(
      `${adsApi.queryKey}/create`,
      formdata,
      headersFormData
    );
  },

  update: async ({ id, payload }: IFormUpdate<IFormAds>) => {
    const isFormData = Object.hasOwn(payload, 'file')
    const formdata = isFormData ? sendFormData(payload) : payload;
    return await http.put<any, IAds>(
      `${adsApi.queryKey}/update/${id}`,
      formdata,
      isFormData ? headersFormData : {}
    );
  },

  delete: async (id: string) => {
    return await http.delete<any, any>(`${adsApi.queryKey}/delete/${id}`);
  },
};
