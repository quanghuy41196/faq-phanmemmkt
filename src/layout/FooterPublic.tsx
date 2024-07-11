import StaticImages from "@/assets/images";
import { LinkTypeFooter } from "@/config";
import Image from "next/image";
import { Fragment } from "react";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const FooterPublic = () => {
  return (
    <div>
      <div className="bg-white shadow-modal px-16 container rounded-[30px] py-6 flex flex-col items-center translate-y-1/2 relative z-10">
        <h2 className="text-xl text-[#0e206d] font-medium text-center w-fit relative pb-2">
          Được tin dùng bởi
          <span className="block w-1/3 bg-[#0e206d] h-1 absolute left-1/2 -translate-x-1/2 bottom-0"></span>
        </h2>

        <div className="mt-5">
          <div className="h-[100px]">
            <Image
              src={
                "https://phanmemmkt.vn/wp-content/uploads/2024/04/Artboard-20@2x-1024x512.png"
              }
              alt="ss"
              width={200}
              height={100}
            />
          </div>
        </div>
      </div>
      <footer
        className="bg-center bg-no-repeat bg-cover pt-32 relative"
        style={{
          backgroundImage: `url('${StaticImages.bg_footer.src}')`,
        }}
      >
        <div className="px-5 pt-5 pb-10">
          <div className="container">
            <div className="flex flex-row-reverse justify-end items-center">
              <div className="w-[250px] h-[59px] mr-9">
                <Image
                  src={StaticImages.LogoWhite}
                  alt="Phần mềm mkt"
                  width={195}
                  height={50}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 max-lg:grid-cols-2 max-lg:gap-y-8 max-sm:grid-cols-1 gap-2">
              {LinkTypeFooter?.map((item, index) => {
                const Element = item?.lastReactElement || Fragment;
                const InnerElement = item?.innerReactElement || Fragment;

                return (
                  <div key={index}>
                    <h4 className="text-f58120 font-semibold text-base uppercase">
                      {item?.head}
                    </h4>

                    <div
                      className={`${
                        item?.classParent ? item?.classParent : ""
                      }`}
                    >
                      <div
                        className={`mt-[10px] space-y-2 ${
                          item?.classDivChild ?? ""
                        }`}
                      >
                        {item?.children &&
                          Array.isArray(item?.children) &&
                          item?.children?.map((child, indexChild) => {
                            const Icon =
                              child?.Icon ||
                              (child?.isArrow && IoIosArrowForward) ||
                              (child?.isDots && FaCircle) ||
                              Fragment;

                            return (
                              <div className="flex" key={indexChild}>
                                <div
                                  className="text-f58120 flex justify-center items-center flex-shrink-0"
                                  style={{ fontSize: child?.isDots ? 8 : 17 }}
                                >
                                  <Icon />
                                </div>
                                <a
                                  href={child?.link}
                                  className="text-sm text-white pl-[5px]"
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {child?.name}
                                </a>
                              </div>
                            );
                          })}
                      </div>
                      <InnerElement />
                    </div>

                    <Element />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0">
          <Image
            src={StaticImages.MIX04698_ly1}
            alt="lyly"
            width={400}
            height={280}
            priority
          />
        </div>

        <div
          className="absolute bottom-0 right-6"
          style={{
            backgroundColor: "#023171",
          }}
        >
          <Image
            src={StaticImages.BANDOVIETNAM}
            alt="lyly"
            width={260}
            // height={280}
            priority
          />
        </div>
      </footer>
      <div
        className="text-white text-center p-[10px]"
        style={{
          background: `linear-gradient(90deg,rgba(24,98,171,1) 0%,rgba(29,159,218,1) 35%,rgba(24,98,171,1) 100%)`,
        }}
      >
        <p className="container text-sm">
          © Copyright 2013 by phần mềm MKT – Website đang chờ đăng ký với bộ
          công thương, nghiêm cấm sao chép dưới mọi hình thức. Mọi hành vi sao
          chép sẽ chịu hoàn toàn trách nhiệm
        </p>
      </div>
    </div>
  );
};

export default FooterPublic;
