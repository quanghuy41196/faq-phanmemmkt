import { adsApi } from "@/services/axios/ads";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllAds(params?: any) {
  return useQuery({
    queryKey: [adsApi.queryKey, params],
    queryFn: async () => await adsApi.getAll(params),
    retry: 0,
  });
}

