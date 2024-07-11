import StaticImages from "@/assets/images";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { routerPath } from "@/config";
import { joinPathParent } from "@/helper/functions";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh_-_(1.625rem_*_2))]">
        <h2 className="mb-2 mx-2 text-3xl text-[#566a7f] font-medium">
          Không Tìm Thấy Trang :(
        </h2>
        <p className="mb-4 mx-2 text-[#566a7f]">
          Oops! 😖 Không tìm thấy URL được yêu cầu trên máy chủ này.
        </p>
        <ButtonFlowbite color="blue" href={joinPathParent(routerPath.home)}>
          Đi đến trang chủ
        </ButtonFlowbite>
        <div className="mt-4">
          <Image
            src={StaticImages.pageMiscErrorLight}
            alt="girl-doing-yoga-light"
            width={500}
            height={300}
            priority
          />
        </div>
      </div>
    </div>
  );
}
