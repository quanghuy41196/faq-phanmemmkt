import { FC, ReactNode } from "react";
import { IconType } from "react-icons";

interface TitleWapperContentProps {
  title?: string;
  outstanding?: ReactNode;
  Icon?: IconType;
  SvgIcon?: ReactNode;
}

const TitleWapperContent: FC<TitleWapperContentProps> = ({
  outstanding,
  title,
  Icon,
  SvgIcon,
}) => {
  return (
    <div className="flex gap-3 text-[#001d8b]">
      {Icon && <Icon size={45} className="flex-shrink-0"/>}
      {SvgIcon && !Icon && SvgIcon}

      {(title || outstanding) && (
        <h2 className="text-[#001d8b] font-extrabold text-4xl relative">
          {title} {outstanding ? " " : undefined}
          {outstanding && <span className="text-[#F8961D]">{outstanding}</span>}
          <span className="block w-28 h-[2px] bg-[#001d8b] mt-1"></span>
        </h2>
      )}
    </div>
  );
};

export default TitleWapperContent;
