import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
};

export default function NotFoundCatchAll() {
  notFound();
}
