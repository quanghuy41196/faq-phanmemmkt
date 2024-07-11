import { productsApi } from "@/services/axios/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: [productsApi.queryKey],
      });
    },
  });
};
