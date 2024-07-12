import { FC } from "react";
import ItemContentCategory from "./ItemContentCategory";

interface ItemBoxListCategoryProps {}

const ItemBoxListCategory: FC<ItemBoxListCategoryProps> = () => {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium px-2">Công nghệ</span>
      <div className="mt-1 space-y-1 pl-2">
        <ItemContentCategory
          list={[
            {
              title: "test",
              id: "",
              content: {
                content: "",
              },
              createdAt: "",
              updateAt: "",
            },
            {
              title: "test111",
              id: "",
              content: {
                content: "",
              },
              createdAt: "",
              updateAt: "",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ItemBoxListCategory;
