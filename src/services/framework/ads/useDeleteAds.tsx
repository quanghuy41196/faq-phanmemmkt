import { adsApi } from "@/services/axios/ads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteAds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adsApi.delete,
    onSuccess: () => {
      toast.success("Xóa quảng cáo thành công");
      queryClient.invalidateQueries({
        queryKey: [adsApi.queryKey],
      });
    },
  });
};
