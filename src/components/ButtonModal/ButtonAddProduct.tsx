import { FC, memo, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import ButtonFlowbite from "../ButtonFlowbite";
import { ModalProducts, ModalProductsProps } from "../Modal";
import ToolTips from "../Tooltips";
import { WapperLabelForm } from "../customFormField";

interface ButtonAddProductProps extends Pick<ModalProductsProps, "onSuccess"> {}

const ButtonAddProduct: FC<ButtonAddProductProps> = ({ onSuccess }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <WapperLabelForm
        classWapper="[&>span]:opacity-0 [&>span]:invisible [&>span]:w-fit"
        label="Thêm"
        isVertical
      >
        <ToolTips content="Thêm sản phẩm">
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
        <ModalProducts
          isShow={isShow}
          setIsShow={setIsShow}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default memo(ButtonAddProduct);
