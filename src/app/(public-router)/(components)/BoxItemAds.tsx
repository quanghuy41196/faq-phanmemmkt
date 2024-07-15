import { cn } from "@/helper/functions";
import { getFetchAllAds } from "@/services/fetch";
import Image from "next/image";
import Link from "next/link";
import { FC, use } from "react";

interface BoxItemAdsProps {
  position?: boolean;
}

const BoxItemAds: FC<BoxItemAdsProps> = ({ position }) => {
  const dataAds = use(
    getFetchAllAds({
      search: {
        position,
        active: true,
      },
    })
  );

  return (
    <div
      className={cn(
        "w-[300px] h-[500px] flex-shrink-0 sticky qc max-1370:w-[250px] max-lg:hidden space-y-2",
        position ? "pr-2" : "pl-2"
      )}
    >
      {dataAds?.items?.map((item) => {
        return (
          <Link href={item?.link ?? ""} key={item?.id}>
            <Image src={item?.image} alt={item?.link} width={300} height={500} priority />
          </Link>
        );
      })}
    </div>
  );
};

export default BoxItemAds;
