import { groupApi } from "@/services/axios/group";
import { ISearchCategory } from "@/services/interface";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllGroup(params?: ISearchCategory) {
  return useQuery({
    queryKey: [groupApi.queryKey, params],
    queryFn: async () => await groupApi.getAll(params),
    retry: 0,
  });
}
