import { postsApi } from "@/services/axios/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreatePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.create,
    onSuccess: () => {
      toast.success("Thêm bài viết thành công");
      queryClient.invalidateQueries({
        queryKey: [postsApi.queryKey],
      });
    },
  });
};
