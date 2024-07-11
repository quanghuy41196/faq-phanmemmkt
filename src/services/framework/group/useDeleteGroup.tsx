import { groupApi } from "@/services/axios/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupApi.delete,
    onSuccess: () => {
      toast.success("Xóa nhóm thành công");
      queryClient.invalidateQueries({
        queryKey: [groupApi.queryKey],
      });
    },
  });
};
