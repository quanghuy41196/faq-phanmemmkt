import { categoryApi } from "@/services/axios/category";
import { ISearchCategory } from "@/services/interface";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllCategory(params?: ISearchCategory) {
  return useQuery({
    queryKey: [categoryApi.queryKey, params],
    queryFn: async () => await categoryApi.getAll(params),
    retry: 0,
  });
}
