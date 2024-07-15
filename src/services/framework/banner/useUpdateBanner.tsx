import { bannerApi } from "@/services/axios/banner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bannerApi.update,
    onSuccess: (_data, variables) => {
      const arrKey = Object.keys(variables?.payload);
      if (arrKey?.length === 1 && arrKey.includes("active")) {
        toast.success("Thay đổi trạng thái thành công");
      } else {
        toast.success("Chỉnh sửa banner thành công");
        queryClient.invalidateQueries({
          queryKey: [bannerApi.queryKey],
        });
      }
    },
  });
};
