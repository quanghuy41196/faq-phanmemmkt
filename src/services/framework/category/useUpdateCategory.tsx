import { categoryApi } from "@/services/axios/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [categoryApi.queryKey],
      });
    },
  });
};
