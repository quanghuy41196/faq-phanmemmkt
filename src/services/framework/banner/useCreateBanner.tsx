
import { bannerApi } from "@/services/axios/banner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bannerApi.create,
    onSuccess: () => {
      toast.success("Thêm banner thành công");
      queryClient.invalidateQueries({
        queryKey: [bannerApi.queryKey],
      });
    },
  });
};
