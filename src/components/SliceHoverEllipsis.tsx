import { sliceString } from "@/helper/functions";
import { FC, ReactNode } from "react";
import ToolTips from "./Tooltips";

interface SliceHoverEllipsisProps {
  value?: string;
  max?: number;
  ellipsis?: ReactNode;
}

const SliceHoverEllipsis: FC<SliceHoverEllipsisProps> = ({
  value,
  max = 10,
  ellipsis = "-",
}) => {
  return (
    <>
      {value ? (
        <ToolTips disabled={value?.length <= max} content={value}>
          <div className="cursor-default">{sliceString(value, max)}</div>
        </ToolTips>
      ) : (
        ellipsis
      )}
    </>
  );
};

export default SliceHoverEllipsis;
