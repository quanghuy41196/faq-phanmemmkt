import { routerPath, slidebarConfig } from "@/config";
import { renderSildebarArrayProps, returnNewConfigSildeBar } from "@/types";
import _ from "lodash";
import { joinPathParent } from "./functions";

export const pickBySearch = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  const filteredObj = _.pickBy(obj, (value) => value !== "");
  return filteredObj as Partial<T>;
};

export const newConfigSildeBarActive = ({
  configArraySildeBar = slidebarConfig,
}: renderSildebarArrayProps): returnNewConfigSildeBar[] => {
  let newConfigSildeBar = _.clone(configArraySildeBar);
  const newConfigActive = newConfigSildeBar?.reduce(
    (total, current, currentIndex) => {
      if (current?.isHeader || current?.isNoRender) return total;
      const path = current?.path ?? routerPath.home;
      const pathParent = joinPathParent(path === routerPath.home ? "" : path);
      if (!current?.children) {
        total.push({
          ...current,
          path: pathParent,
          positionActive: [currentIndex],
        });
      } else {
        current.children?.forEach((item, childIndex) => {
          if (item?.isNoRender) return;
          const pathChild = joinPathParent(pathParent, item?.path ?? "");
          total.push({
            ...item,
            path: pathChild,
            positionActive: [currentIndex, childIndex],
          });
        });
      }
      return total;
    },
    [] as returnNewConfigSildeBar[]
  );
  return newConfigActive;
};
