import { postsApi } from "@/services/axios/posts";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllPosts(params?: any) {
  return useQuery({
    queryKey: [postsApi.queryKey, params],
    queryFn: async () => await postsApi.getAll(params),
    retry: 0,
  });
}

