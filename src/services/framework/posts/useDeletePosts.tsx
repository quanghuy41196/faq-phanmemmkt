import { postsApi } from "@/services/axios/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeletePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.delete,
    onSuccess: () => {
      toast.success("Xóa bài viết thành công");
      queryClient.invalidateQueries({
        queryKey: [postsApi.queryKey],
      });
    },
  });
};
