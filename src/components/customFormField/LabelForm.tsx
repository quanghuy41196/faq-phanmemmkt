import { cn } from "@/helper/functions";
import { FC, ReactNode } from "react";

export interface LabelFormProps {
  isVertical?: boolean;
  children?: ReactNode;
  isRequired?: boolean;
}

const LabelForm: FC<LabelFormProps> = ({ isRequired, isVertical, children }) => {
  return (
    <>
      {children && (
        <span
          className={cn(
            "text-sm mb-2 font-medium block",
            !isVertical && "w-[12rem] flex-shrink-0 sm:py-3"
          )}
        >
          {children} {isRequired && <span className="text-red-500">*</span>}
        </span>
      )}
    </>
  );
};

export default LabelForm;
