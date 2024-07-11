// import LayoutDefaultAuth from "@/components/LayoutDefaultAuth";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="mb-6 text-lg font-medium mt-3 text-center text-[#114aa0]">
        ĐĂNG NHẬP HỆ THỐNG <br />
        QUẢN LÝ PHẦN MỀM MARKETING MKT
      </h1>
      {children}
    </>
  );
}
