/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { findConfigSildeBar } from "@/helper/functions";
import { newConfigSildeBarActive } from "@/helper/utils";
import { returnNewConfigSildeBar } from "@/types";
import { usePathname } from "next/navigation";
import { FC, ReactNode, createContext, useContext, useMemo } from "react";

type ContextCurrentUserValues = {
  configSildeBarActive?: returnNewConfigSildeBar;
  isLoading?: boolean;
  clearUserPermission?: () => void;
};

const ContextCurrentUser = createContext<ContextCurrentUserValues>({});

interface LayoutCurrentUserProps {
  children?: ReactNode;
}

const LayoutCurrentUser: FC<LayoutCurrentUserProps> = ({ children }) => {
  const pathname = usePathname();

  const configSildeBarActive = useMemo(():
    | returnNewConfigSildeBar
    | undefined => {
    const newConfigActive = newConfigSildeBarActive({});
    return findConfigSildeBar({
      slidebarArray: newConfigActive,
      newPathName: pathname ?? "",
    });
  }, [pathname]);

  const values = useMemo((): ContextCurrentUserValues => {
    return {
      configSildeBarActive,
    };
  }, [configSildeBarActive]);

  return (
    <ContextCurrentUser.Provider value={values}>
      {children}
    </ContextCurrentUser.Provider>
  );
};

export const useLayoutCurrentUser = () => {
  return useContext(ContextCurrentUser);
};

export default LayoutCurrentUser;
