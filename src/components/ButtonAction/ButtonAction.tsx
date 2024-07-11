import { cn } from "@/helper/functions";
import { FC } from "react";
import { ColorButton } from "../ButtonFlowbite";
import ToolTips, { ToolTipsCustom } from "../Tooltips";

interface ButtonActionProps extends ToolTipsCustom {
  classWapperAction?: string;
  color?: ColorButton;
}

const buttonVariantClasses: Record<ColorButton, string> = {
  blue: "text-blue-500 hover:text-blue-600",
  dark: "text-black",
  failure: "text-red-500 hover:text-red-600",
  gray: "text-gray-500 hover:text-gray-600",
  light: "text-light",
  purple: "text-purple-500 hover:text-purple-600",
  success: "text-success",
  warning: "text-orange-500 hover:text-orange-600",
  yellow: ""
};

const ButtonAction: FC<ButtonActionProps> = ({
  classWapperAction,
  children,
  color = "blue",
  ...rest
}) => {
  return (
    <div
      className={cn(
        "w-fit",
        classWapperAction,
        rest?.disabled ? "cursor-default opacity-50" : "cursor-pointer"
      )}
    >
      <ToolTips
        {...rest}
        classWapper={cn(rest?.className, buttonVariantClasses[color])}
      >
        {children}
      </ToolTips>
    </div>
  );
};

export default ButtonAction;
