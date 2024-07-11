"use client";
import AccordionWapper, {
  AccordionWapperProps,
} from "@/components/AccordionWapper";
import { cn } from "@/helper/functions";
import { FC, ReactNode } from "react";
import { IoIosArrowUp } from "react-icons/io";
// import AccordionWapper from "./AccordionWapper"

export interface AccordionProps
  extends Pick<AccordionWapperProps, "callBackUpdate" | "isUpdate" | "dependent"> {
  title?: ReactNode;
  desc?: ReactNode;
  classAccordion?: string;
  isOpen?: boolean;
  classContent?: string;
}

const Accordion: FC<AccordionProps> = ({
  title,
  desc,
  classAccordion,
  classContent,
  callBackUpdate,
  isUpdate,
}) => {
  return (
    <AccordionWapper callBackUpdate={callBackUpdate} isUpdate={isUpdate}>
      {({ refContent, active, toggleAccordion }) => {
        return (
          <div className={`overflow-hidden ${classAccordion ?? ""}`}>
            <div
              className="px-5 py-[15px] !pr-[35px] bg-[#f3f3f3] relative cursor-pointer select-none text-[#212529]"
              aria-hidden="true"
              onClick={() => {
                typeof toggleAccordion === "function" && toggleAccordion();
              }}
            >
              <span
                className="text-lg font-semibold text-current"
                style={{ lineHeight: "25px" }}
              >
                {title}
              </span>

              <div
                className="absolute top-1/2 -translate-y-1/2 right-1 text-current -translate-x-1/2"
                style={{ fontSize: 20 }}
              >
                <IoIosArrowUp
                  className={`transition-all ${active ? "" : "-rotate-180"}`}
                />
              </div>
            </div>
            <div
              ref={refContent}
              className={cn("accordion-content", classContent)}
            >
              <div className="bg-white px-5 py-[15px]">{desc}</div>
            </div>
          </div>
        );
      }}
    </AccordionWapper>
  );
};

export default Accordion;
