"use client";

import { routerPath } from "@/config";
import { cn, joinPathParent } from "@/helper/functions";
import { IPost } from "@/services/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface ItemContentCategoryProps {
  list?: IPost[];
}

const ItemContentCategory: FC<ItemContentCategoryProps> = ({ list }) => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col">
      {list?.map((item) => {
        const url = joinPathParent(routerPath.post, item?.slug ?? "");
        const isActive = url === pathName;
        return (
          <Link
            className={cn(
              "text-sm py-2 ml-1",
              isActive ? "text-fb9102" : "hover:text-fb9102"
            )}
            key={item?.id}
            href={url}
          >
            {item?.title}
          </Link>
        );
      })}
    </div>
  );
};

export default ItemContentCategory;
