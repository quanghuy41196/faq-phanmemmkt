import { FC, memo, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import ButtonFlowbite from "../ButtonFlowbite";
import { ModalGroup, ModalGroupProps } from "../Modal";
import ToolTips from "../Tooltips";
import { WapperLabelForm } from "../customFormField";

interface ButtonAddGroupProps extends Pick<ModalGroupProps, "onSuccess"> {}

const ButtonAddGroup: FC<ButtonAddGroupProps> = ({ onSuccess }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <WapperLabelForm
        classWapper="[&>span]:opacity-0 [&>span]:invisible [&>span]:w-fit"
        label="Thêm"
        isVertical
      >
        <ToolTips content="Thêm nhóm">
          <ButtonFlowbite
            size="xs"
            color="blue"
            className="h-[42px] items-center"
            onClick={() => setIsShow(true)}
          >
            <IoIosAddCircle size={24} />
          </ButtonFlowbite>
        </ToolTips>
      </WapperLabelForm>

      {isShow && (
        <ModalGroup
          isShow={isShow}
          setIsShow={setIsShow}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default memo(ButtonAddGroup);
