/* eslint-disable jsx-a11y/alt-text */
import StaticImages from "@/assets/images";
import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";
import { ModalViewImage } from "./Modal";

interface ImageViewModalProps extends Omit<ImageProps, "src" | "alt"> {
  src?: ImageProps["src"];
  alt?: string
}

const ImageViewModal: FC<ImageViewModalProps> = ({
  src,
  alt,
  width,
  height,
  ...spread
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {src ? (
        <Image
          width={width ?? 50}
          height={height ?? 50}
          src={src ?? StaticImages.defaultAvatar}
          onClick={() => setIsOpen(true)}
          alt={alt ?? "hình ảnh"}
          className="cursor-pointer"
          {...spread}
        />
      ) : (
        "-"
      )}

      {src && isOpen && (
        <ModalViewImage isShow={isOpen} setIsShow={setIsOpen} src={src} />
      )}
    </>
  );
};

export default ImageViewModal;
