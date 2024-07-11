import { cn } from "@/helper/functions";
import { FC, HTMLAttributes, ReactNode } from "react";
import LabelForm, { LabelFormProps } from "./LabelForm";

export interface WapperLabelFormProps extends Omit<LabelFormProps, 'children'> {
  classWapper?: HTMLAttributes<HTMLDivElement>["className"];
  label?: ReactNode;
  children?: ReactNode;
}

const WapperLabelForm: FC<WapperLabelFormProps> = ({
  classWapper,
  isRequired,
  label,
  children,
  isVertical,
}) => {
  return (
    <div
      className={cn(
        !isVertical && "max-md:flex-col flex items-start",
        classWapper
      )}
    >
      <LabelForm isRequired={isRequired} isVertical={isVertical}>
        {label}
      </LabelForm>

      <div className="w-full">{children}</div>
    </div>
  );
};

export default WapperLabelForm;
