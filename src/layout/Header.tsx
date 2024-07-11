"use client";
import { cn } from "@/helper/functions";
import { FC } from "react";
import DropdownAvatar from "./DropdownAvatar";

const Header: FC = () => {
  return (
    <header
      className={cn(
        "sticky top-0 border-b ml-0.5 px-3.5 bg-white z-20",
        "shadow-md"
      )}
    >
      <div className="flex justify-between !px-0">
        <div className="flex justify-end items-center cursor-pointer">
          <div className="py-2">
            <button>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 17h14M5 12h14M5 7h14"
                />
              </svg>
              <span className="sr-only">Expand / collapse sidebar</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between h-[65px] -mb-px">
          <div className="flex items-center space-x-2.5">
            <DropdownAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
