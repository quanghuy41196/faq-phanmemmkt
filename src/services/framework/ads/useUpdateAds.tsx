import { adsApi } from "@/services/axios/ads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateAds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adsApi.update,
    onSuccess: (_data, variables) => {
      const arrKey = Object.keys(variables?.payload);
      if (arrKey?.length === 1 && arrKey.includes('active')) {
        toast.success("Thay đổi trạng thái thành công");
      } else {
        toast.success("Chỉnh sửa quảng cáo thành công");
        queryClient.invalidateQueries({
          queryKey: [adsApi.queryKey],
        });
      }
    },
  });
};
