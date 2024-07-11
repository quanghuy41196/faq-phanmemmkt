"use client";
import { removeAuthToken, routerPath } from "@/config";
import { joinPathParent } from "@/helper/functions";
import { authApi } from "@/services/axios/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      removeAuthToken();
      toast.success("Đăng xuất thành công");
      router.push(
        joinPathParent(routerPath.admin, routerPath.auth, routerPath.login)
      );
    },
  });
};
