import { IFormLogin, IResultAuth } from "../interface";
import http from "./httpClient";

export const authApi = {
  queryKey: "auth",

  login: async (payload: IFormLogin) => {
    return await http.post<any, IResultAuth>(
      `${authApi.queryKey}/login`,
      payload
    );
  },

  logout: async () => {
    return await http.get<any, any>(`${authApi.queryKey}/logout`);
  },

  createUser: async (payload: any) => {
    return await http.post<any>(`${authApi.queryKey}/create`, payload);
  },
};
