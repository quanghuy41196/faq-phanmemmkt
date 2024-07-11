import LayoutCurrentUser from "@/context/LayoutCurrentUser";
import LayoutDefault from "@/layout/LayoutDefault";
import { Metadata } from "next";
import { headers } from "next/headers";
import { FC, PropsWithChildren } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const header = headers();
  return {
    title: "Phần mềm",
  };
}

const LayoutPrivateRoutes: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutCurrentUser>
      <LayoutDefault>{children}</LayoutDefault>
    </LayoutCurrentUser>
  );
};

export default LayoutPrivateRoutes;
