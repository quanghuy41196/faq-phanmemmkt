import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BoxItemProps {
  src?: string;
  title?: string;
  desc?: string;
  href?: string;
}

const BoxItem: FC<BoxItemProps> = ({ src, title, desc, href }) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      {src && (
        <div className="w-[224px] h-[228px] flex items-center justify-center flex-shrink-0">
          <Link href={href ?? ""}>
            <Image
              width={224}
              height={228}
              src={src}
              alt={title ?? ""}
              priority
            />
          </Link>
        </div>
      )}

      <div className="space-y-4 flex flex-col items-center">
        <Link
          href={href ?? ""}
          className="text-xl text-white text-center min-h-[60px] font-medium rounded-md w-fit min-w-[224px] px-3 line-clamp-2 flex items-center justify-center"
          style={{
            background: `linear-gradient(141.21deg, #33C5F3 -30.84%, #243E8E 72.88%)`,
          }}
        >
          {title}
        </Link>
        <p className="text-center">{desc}</p>
      </div>
    </div>
  );
};

export default BoxItem;
