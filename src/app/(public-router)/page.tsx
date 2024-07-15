import { routerPath } from "@/config";
import { joinPathParent } from "@/helper/functions";
import { getFetchAllCategory } from "@/services/fetch";
import { use } from "react";
import BoxItem from "./(components)/BoxItem";

const HomePage = () => {
  const dataCategory = use(
    getFetchAllCategory({
      search: {
        includes: "posts",
      },
    })
  );

  return (
    <div className="flex mt-3">
      <div className="grid max-1370:grid-cols-2 1370:grid-cols-3 2xl:grid-cols-4 max-sm:grid-cols-1 gap-5 w-full">
        {(dataCategory?.items ?? [])?.map((item) => {
          return (
            <BoxItem
              href={joinPathParent(routerPath.post, item?.posts?.slug ?? "")}
              key={item?.id}
              src={item?.icon}
              title={item?.name}
              desc={item?.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
