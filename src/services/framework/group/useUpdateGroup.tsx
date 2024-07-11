import { groupApi } from "@/services/axios/group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [groupApi.queryKey],
      });
    },
  });
};
