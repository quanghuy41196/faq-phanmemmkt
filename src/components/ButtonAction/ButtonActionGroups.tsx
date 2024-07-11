import { cn } from "@/helper/functions";
import { FC, ReactNode } from "react";

interface ButtonActionGroupsProps {
  classWapper?: string;
  children?: ReactNode;
}
const ButtonActionGroups: FC<ButtonActionGroupsProps> = ({
  classWapper,
  children,
}) => {
  return (
    <div className={cn("flex justify-center gap-3", classWapper)}>
      {children}
    </div>
  );
};

export default ButtonActionGroups;
