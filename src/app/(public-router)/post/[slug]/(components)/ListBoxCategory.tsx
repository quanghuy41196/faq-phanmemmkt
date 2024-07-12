import { getFetchAllPost } from "@/services/fetch";
import { ICategory } from "@/services/interface";
import { FC, use } from "react";
import ItemContentCategory from "./ItemContentCategory";

interface ListBoxCategoryProps {
  currentCategory?: ICategory;
}

const ListBoxCategory: FC<ListBoxCategoryProps> = ({ currentCategory }) => {
  const dataPost = use(
    getFetchAllPost({
      search: {
        categoryId: currentCategory?.id,
      },
    })
  );

  return (
    <div className="shadow-modal w-[350px] rounded-md sticky top-20 py-1 flex-shrink-0 h-full overflow-y-auto max-984:hidden">
      <div className="space-y-2">
        <span className="text-sm font-medium px-2">{currentCategory?.name}</span>
        <div className="mt-1 space-y-1 pl-2">
          <ItemContentCategory
            list={dataPost?.items ?? []}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBoxCategory;
