import { cn } from "@/helper/functions";
import { FC, ReactNode } from "react";

interface FilterItemsProps {
  classItems?: string;
  children?: ReactNode;
  isButton?: boolean;
}

const FilterItems: FC<FilterItemsProps> = ({
  children,
  classItems,
  isButton,
}) => {
  return (
    <div
      className={cn(
        isButton
          ? "flex justify-end gap-2 flex-wrap"
          : "flex gap-2 flex-wrap max-xl:w-full lg:[&>*]:w-60 sm:[&>*]:w-[calc(50%_-_1.25rem)] max-sm:[&>*]:w-full",
        classItems
      )}
    >
      {children}
    </div>
  );
};

export default FilterItems;
