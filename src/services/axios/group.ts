import { IFormGroup, IFormUpdateGroup, IGroup, MktPaginationResponse } from "../interface";
import http from "./httpClient";

export const groupApi = {
  queryKey: "group",

  getAll: async (params?: any) => {
    return await http.get<any, MktPaginationResponse<IGroup>>(
      `${groupApi.queryKey}/getall`,
      {
        params: params ?? {},
      }
    );
  },

  create: async (payload: IFormGroup) => {
    return await http.post<any, IGroup>(`${groupApi.queryKey}/create`, payload);
  },

  update: async (payload: IFormUpdateGroup) => {
    return await http.put<any, IGroup>(`${groupApi.queryKey}/update`, payload);
  },

  delete: async (id: string) => {
    return await http.delete<any, any>(`${groupApi.queryKey}/delete/${id}`);
  },
};
