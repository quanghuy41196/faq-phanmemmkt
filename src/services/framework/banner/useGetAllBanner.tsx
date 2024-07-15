import { bannerApi } from "@/services/axios/banner";
import { ISearchCategory } from "@/services/interface";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllBanner(params?: ISearchCategory) {
  return useQuery({
    queryKey: [bannerApi.queryKey, params],
    queryFn: async () => await bannerApi.getAll(params),
    retry: 0,
  });
}
