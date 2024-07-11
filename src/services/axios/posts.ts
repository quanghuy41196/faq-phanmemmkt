import { MktPaginationResponse } from "../interface";
import { IFormPost, IFormUpdatePost, IPost } from "../interface/posts";
import http from "./httpClient";

export const postsApi = {
  queryKey: "post",

  getAll: async (params?: any) => {
    return await http.get<any, MktPaginationResponse<IPost>>(`${postsApi.queryKey}/byboth`, {
      params: params ?? {},
    });
  },

  create: async (payload: IFormPost) => {
    return await http.post<any, IPost>(`${postsApi.queryKey}/create`, payload);
  },

  update: async (payload: IFormUpdatePost) => {
    return await http.put<any, IPost>(`${postsApi.queryKey}/update`, payload);
  },

  delete: async (id: string) => {
    return await http.delete<any, any>(`${postsApi.queryKey}/delete/${id}`);
  },
};
