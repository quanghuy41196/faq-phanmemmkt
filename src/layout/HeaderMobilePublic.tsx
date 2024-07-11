"use client";
import StaticImages from "@/assets/images";
import { listNavHeader } from "@/config";
import { cn } from "@/helper/functions";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";

const HeaderMobilePublic = () => {
  const [show, setIsShow] = useState(false);

  const scrollHeader = useCallback(() => {
    const elemHeader = document.getElementById("header");
    const allQC: NodeListOf<HTMLDivElement> = document.querySelectorAll(".qc");
    if (elemHeader) {
      const { height } = elemHeader.getBoundingClientRect();
      const y = window.scrollY;

      allQC?.forEach((elem) => {
        elem.style.top = `${height + 10}px`;
        elem.classList.add("scroll");
      });

      if (y > 0) {
        elemHeader.classList.add("shadow-modal");
      } else {
        elemHeader.classList.remove("shadow-modal");
      }
    }
  }, []);

  useEffect(() => {
    scrollHeader();
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, [scrollHeader]);

  return (
    <div className="984:hidden">
      <FaBarsStaggered
        size={25}
        className="text-fb9102 cursor-pointer"
        onClick={() => setIsShow(true)}
      />

      <div
        className={cn(
          "fixed top-0 bottom-0 w-[300px] bg-white shadow-modal overflow-y-auto z-40 transition-all duration-300",
          show ? "left-0" : "-left-full"
        )}
      >
        <div className="flex justify-center sticky top-0 bg-white py-1">
          <Link href="/" className="w-fit block">
            <Image src={StaticImages.Logo} alt="logo" width={180} height={60} />
          </Link>
        </div>

        <div className="flex flex-col gap-3 ">
          {listNavHeader?.map((nav, index) => {
            return (
              <Link
                href={nav?.href ?? "/"}
                target={nav?.isBlank ? "_blank" : undefined}
                className="text-[#001d8b] hover:text-[#f9870b] py-2 px-3 font-semibold"
                key={index}
              >
                {nav?.text}
              </Link>
            );
          })}
        </div>

        <div className="bg-white h-2 w-full sticky bottom-0"></div>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-white-dark/50 z-[38]",
          show ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsShow(false)}
      ></div>
    </div>
  );
};

export default HeaderMobilePublic;
