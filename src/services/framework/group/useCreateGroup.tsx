import { groupApi } from "@/services/axios/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupApi.create,
    onSuccess: () => {
      toast.success("Thêm nhóm thành công");
      queryClient.invalidateQueries({
        queryKey: [groupApi.queryKey],
      });
    },
  });
};
