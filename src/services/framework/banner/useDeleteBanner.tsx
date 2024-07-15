import { bannerApi } from "@/services/axios/banner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bannerApi.delete,
    onSuccess: () => {
      toast.success("Xóa banner thành công");
      queryClient.invalidateQueries({
        queryKey: [bannerApi.queryKey],
      });
    },
  });
};
