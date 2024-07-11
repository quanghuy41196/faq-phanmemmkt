import Image from "next/image";
import { FC } from "react";

interface BoxItemProps {
  src?: string;
  title?: string;
}

const BoxItem: FC<BoxItemProps> = ({ src, title }) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      {src && (
        <div className="w-[224px] h-[228px] flex items-center justify-center">
          <Image width={224} height={228} src={src} alt={title ?? ""} property="" />
        </div>
      )}

      <div className="space-y-4 flex flex-col items-center">
        <h2
          className="text-xl text-white text-center min-h-[60px] font-medium rounded-md w-fit min-w-[224px] px-3 line-clamp-2 flex items-center justify-center"
          style={{
            background: `linear-gradient(141.21deg, #33C5F3 -30.84%, #243E8E 72.88%)`,
          }}
        >
          {title}
        </h2>
        <p className="text-center">
          Figma ipsum component variant main layer. Subtract text style inspect
          vertical horizontal rotate reesizing. Subtract{" "}
        </p>
      </div>
    </div>
  );
};

export default BoxItem;
