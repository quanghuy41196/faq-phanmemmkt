import { IModalDefaultProps } from "@/types";
import { Modal } from "flowbite-react";
import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface ModalViewImagePops extends IModalDefaultProps {
  handleClose?: () => void;
  src?: ImageProps['src'];
}

const ModalViewImage: FC<ModalViewImagePops> = ({
  isShow,
  setIsShow,
  handleClose,
  src,
}) => {
  return (
    <Modal
      popup
      size={"md"}
      show={isShow}
      className="[&>div>div]:bg-transparent [&>div]:p-0 [&>div]:outline-0 [&>div>div]:shadow-none"
      dismissible
      onClose={() => {
        setIsShow && setIsShow(false);
        handleClose && handleClose();
      }}
    >
      {src && (
        <Image
          src={src}
          alt="hình ảnh"
          width={300}
          height={300}
          className="w-full rounded-xl"
          priority
        />
      )}
    </Modal>
  );
};

export default ModalViewImage;
