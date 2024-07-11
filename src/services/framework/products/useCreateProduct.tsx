import { productsApi } from "@/services/axios/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      toast.success("Thêm sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: [productsApi.queryKey],
      });
    },
  });
};
