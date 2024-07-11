import StaticImages from "@/assets/images";
import { listNavHeader } from "@/config";
import Image from "next/image";
import Link from "next/link";
import HeaderMobilePublic from "./HeaderMobilePublic";

const HeaderPublic = () => {
  return (
    <header className="sticky bg-white top-0 left-0 z-50" id="header">
      <div className="container mx-auto flex items-center gap-5 justify-between">
        <div>
          <Link href="/" className="w-fit block">
            <Image src={StaticImages.Logo} alt="logo" width={180} height={60} />
          </Link>
        </div>

        <div className="flex items-center gap-5 [&>a]:font-semibold [&>a]:text-base [&>a]:px-2 [&>a]:py-1 [&>a]:transition-colors max-984:hidden">
          {listNavHeader?.map((nav, index) => {
            return (
              <Link
                href={nav?.href ?? "/"}
                target={nav?.isBlank ? "_blank" : undefined}
                className="text-[#001d8b] hover:text-[#f9870b]"
                key={index}
              >
                {nav?.text}
              </Link>
            );
          })}
        </div>

        <HeaderMobilePublic />
      </div>
    </header>
  );
};

export default HeaderPublic;
