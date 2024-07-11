"use client";
import StaticImages from "@/assets/images";
import { slidebarConfig } from "@/config";
import { useLayoutCurrentUser } from "@/context/LayoutCurrentUser";
import { cn, joinPathParent } from "@/helper/functions";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment } from "react";
interface SideBarProps {
  isShow?: boolean;
}

const SideBar: FC<SideBarProps> = () => {
  const { configSildeBarActive } = useLayoutCurrentUser();
  // const { isCollapsed } = useSidebarContext();

  return (
    <div
      id="sidebar"
      className={cn(
        "sidebar bg-white overflow-hidden fixed top-0 bottom-0 z-50 h-full min-h-screen w-[300px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300"
        // isCollapsed && "hidden"
      )}
    >
      <div className="flex items-center justify-center px-4 relative">
        <Link
          // href={joinPathParent(language, config.routerPath.employee)}
          href={"/"}
          className="main-logo flex shrink-0 items-center justify-center flex-1"
        >
          <Image
            height={95}
            className="flex-none w-[250px]"
            src={StaticImages.Logo}
            alt="logo"
            priority
          />
        </Link>
      </div>

      <div className={cn("relative mt-5")}>
        <ul className="relative space-y-0.5 py-0 font-semibold w-full px-4">
          {slidebarConfig?.map((item, index) => {
            const activeIndex = configSildeBarActive?.positionActive?.[0] ?? -1;
            const Icon = item?.Icon;
            const parentPath = joinPathParent(item?.path ?? "");

            return (
              <Fragment key={index}>
                {item?.isHeader && (
                  <li className="mb-2">
                    <h3 className="flex items-center text-[#1e88e5] space-x-2">
                      {Icon ? <Icon size={26} /> : <Fragment />}
                      <span className="text-[20px] font-medium">
                        {item?.title}
                      </span>
                    </h3>
                  </li>
                )}

                {!item?.isHeader && !item?.children && (
                  <li className="rounded-sm mb-0.5 last:mb-0">
                    <Link
                      href={parentPath}
                      className={cn(
                        "block relative pl-5 px-3 py-2 truncate transition duration-150",
                        activeIndex === index
                          ? "text-[#1e88e5] bg-[#e2e6f0]"
                          : "hover:text-[#1e88e5] hover:bg-[#e2e6f0]"
                      )}
                    >
                      {activeIndex === index && (
                        <span className="absolute left-0 w-1 bg-blue-500 h-full top-1/2 -translate-y-1/2"></span>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {Icon ? <Icon size={22} /> : <Fragment />}
                          <span className="font-medium ml-3 duration-200 text-base">
                            {item?.title}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                )}
                {/* 

                {!item?.isHeader && item?.children && (
                  <SlideBarItem
                    item={item}
                    parentPath={parentPath}
                    index={index}
                  />
                )} */}
              </Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
