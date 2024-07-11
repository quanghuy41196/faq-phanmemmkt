"use client";
import { routerPath, setAccessToken } from "@/config";
import { joinPathParent } from "@/helper/functions";
import { authApi } from "@/services/axios/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công");
      setAccessToken(data?.token);
      router.push(joinPathParent(routerPath.admin, routerPath.feature));
    },
  });
};
