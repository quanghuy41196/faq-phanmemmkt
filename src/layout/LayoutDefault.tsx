import { cn } from "@/helper/functions";
import { FC, PropsWithChildren } from "react";
import Header from "./Header";
import SideBar from "./sidebar";

const LayoutDefault: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="navbar-sticky main-container min-h-screen text-black">
      <SideBar />
      <div
        className={cn(
          "main-content bg-[#dddddd] ml-[300px]"
        )}
      >
        <Header />
        <div className={`animate__animated p-6 pt-10 min-h-[100vh]`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutDefault;
