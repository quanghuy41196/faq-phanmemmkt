import { FC, use } from "react";
import ItemBoxListCategory from "./ItemBoxListCategory";

interface ListBoxCategoryProps {
  productId?: string;
}

const ListBoxCategory: FC<ListBoxCategoryProps> = ({ productId }) => {
  return (
    <div className="shadow-modal w-[350px] rounded-md sticky top-20 py-1 flex-shrink-0 h-full overflow-y-auto max-984:hidden">
      <ItemBoxListCategory />
    </div>
  );
};

export default ListBoxCategory;
