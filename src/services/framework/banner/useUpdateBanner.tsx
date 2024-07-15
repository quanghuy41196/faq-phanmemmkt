import { bannerApi } from "@/services/axios/banner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bannerApi.update,
    onSuccess: () => {
      toast.success("Chỉnh sửa banner thành công");
      queryClient.invalidateQueries({
        queryKey: [bannerApi.queryKey],
      });
    },
  });
};
