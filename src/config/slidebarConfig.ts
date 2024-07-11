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
    title: "Sản phẩm",
    Icon: AiFillProduct,
    path: joinPathParent(routerPath.admin, routerPath.product),
  },
  {
    title: "Danh mục",
    Icon: TbCategory2,
    path: joinPathParent(routerPath.admin, routerPath.category),
  },
  {
    title: "Bài viết",
    Icon: MdPostAdd,
    path: joinPathParent(routerPath.admin, routerPath.post),
  },

  {
    title: "Nhóm",
    Icon: LiaObjectUngroupSolid,
    path: joinPathParent(routerPath.admin, routerPath.group),
  },
];
