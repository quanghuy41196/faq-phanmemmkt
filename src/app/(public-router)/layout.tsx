import { site } from "@/config";
import FooterPublic from "@/layout/FooterPublic";
import HeaderPublic from "@/layout/HeaderPublic";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import Banner from "./(components)/Banner";

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
        {/* <div id="left-qc" className="bg-black w-[300px] h-[500px] flex-shrink-0 sticky qc max-1370:w-[250px] max-lg:hidden"></div> */}
        <div className="mx-auto py-8 container">{children}</div>
        {/* <div id="right-qc" className="bg-black w-[300px] h-[500px] flex-shrink-0 sticky qc max-1370:w-[250px] max-lg:hidden"></div> */}
      </div>
      <FooterPublic />
    </div>
  );
};

export default LayoutPublicRouter;
