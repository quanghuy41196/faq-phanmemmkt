import { categoryApi } from "@/services/axios/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      toast.success("Thêm danh mục thành công");
      queryClient.invalidateQueries({
        queryKey: [categoryApi.queryKey],
      });
    },
  });
};
