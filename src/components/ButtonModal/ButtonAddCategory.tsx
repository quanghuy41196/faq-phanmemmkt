import { FC, memo, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import ButtonFlowbite from "../ButtonFlowbite";
import { ModalCategory, ModalCategoryProps } from "../Modal";
import ToolTips from "../Tooltips";
import { WapperLabelForm } from "../customFormField";

interface ButtonAddCategoryProps
  extends Pick<ModalCategoryProps, "onSuccess"> {}

const ButtonAddCategory: FC<ButtonAddCategoryProps> = ({ onSuccess }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <WapperLabelForm
        classWapper="[&>span]:opacity-0 [&>span]:invisible [&>span]:w-fit"
        label="Thêm"
        isVertical
      >
        <ToolTips content="Thêm danh mục">
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
        <ModalCategory
          isShow={isShow}
          setIsShow={setIsShow}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default memo(ButtonAddCategory);
