import { productsApi } from "@/services/axios/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.update,
    onSuccess: () => {
      toast.success("Chỉnh sửa sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: [productsApi.queryKey],
      });
    },
  });
};
