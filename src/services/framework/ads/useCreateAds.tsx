import { adsApi } from "@/services/axios/ads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateAds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adsApi.create,
    onSuccess: () => {
      toast.success("Thêm quảng cáo thành công");
      queryClient.invalidateQueries({
        queryKey: [adsApi.queryKey],
      });
    },
  });
};
