import { cn } from "@/helper/functions";
import { FC, ReactNode } from "react";

interface FilterWapperProps {
  classWapper?: string;
  children?: ReactNode;
}

const FilterWapper: FC<FilterWapperProps> = ({ classWapper, children }) => {
  return <div className={cn("space-y-2 my-5", classWapper)}>{children}</div>;
};

export default FilterWapper;
