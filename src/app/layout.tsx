import StaticImages from "@/assets/images";
import { site } from "@/config";
import ReactQueryProvider from "@/services/react-query/react-query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Trang chủ",
    template: `%s | ${site.name}`,
  },
  icons: StaticImages.mktFavico?.src
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
