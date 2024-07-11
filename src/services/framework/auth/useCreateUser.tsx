import { authApi } from "@/services/axios/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: authApi.createUser,
    onSuccess: () => {
      toast.success("Đăng ký tài khoản thành công");
    },
  });
};
