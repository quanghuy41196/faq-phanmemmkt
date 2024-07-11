import { postsApi } from "@/services/axios/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdatePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.update,
    onSuccess: () => {
      toast.success("Chỉnh sửa bài viết thành công");
      queryClient.invalidateQueries({
        queryKey: [postsApi.queryKey],
      });
    },
  });
};
