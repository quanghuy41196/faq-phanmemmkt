import { site } from "@/config";
import FooterPublic from "@/layout/FooterPublic";
import HeaderPublic from "@/layout/HeaderPublic";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import Banner from "./(components)/Banner";
import BoxItemAds from "./(components)/BoxItemAds";

export const metadata: Metadata = {
  title: {
    default: "Phần Mềm MKT",
    template: `%s | ${site.name}`,
  },
  description:
    "Hướng dẫn phần mềm MKT Hướng dẫn sử dụng, ứng dụng phần mềm marketing MKT vào kinh doanh, bán hàng online hỗ trợ tương tác Faceb...",
};

const LayoutPublicRouter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <HeaderPublic />
      <Banner />
      <div className="flex gap-2 mt-5">
        <BoxItemAds />
        <div className="mx-auto py-8 container">{children}</div>
        <BoxItemAds position/>
      </div>
      <FooterPublic />
    </div>
  );
};

export default LayoutPublicRouter;
