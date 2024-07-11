import { joinPathParent } from "@/helper/functions";
import { slidebarConfigProps } from "@/types";
import { AiFillProduct } from "react-icons/ai";
import { LiaObjectUngroupSolid } from "react-icons/lia";
import { MdPostAdd } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { routerPath } from "./router";

export const slidebarConfig: slidebarConfigProps[] = [
  { title: "Quản Lý", isHeader: true, Icon: RiDashboardFill },
  {
    title: "Tính năng",
    Icon: AiFillProduct,
    path: joinPathParent(routerPath.admin, routerPath.feature),
  },
  {
    title: "Banner",
    Icon: TbCategory2,
    path: joinPathParent(routerPath.admin, routerPath.banner),
  },
  {
    title: "Đối tác",
    Icon: MdPostAdd,
    path: joinPathParent(routerPath.admin, routerPath.trusted),
  },

  {
    title: "Quảng cáo",
    Icon: LiaObjectUngroupSolid,
    path: joinPathParent(routerPath.admin, routerPath.advertisement),
  },
];
