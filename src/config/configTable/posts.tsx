import { ButtonAction, ButtonActionGroups } from "@/components/ButtonAction";
import SliceHoverEllipsis from "@/components/SliceHoverEllipsis";
import { formatDate } from "@/helper/functions";
import { IPost } from "@/services/interface";
import { TDataColumnTable, configTableParams } from "@/types";
import { MdDelete } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";

export const configTablePosts = ({
  handleDelete,
  handleForm,
}: configTableParams<IPost>): TDataColumnTable<IPost> => {
  return [
    {
      accessor: "title",
      title: "Tiêu đề",
      sortable: true,
      render: ({ title }) => <SliceHoverEllipsis value={title} max={50} />,
    },

    {
      accessor: "slug",
      sortable: true,
      title: "Liên kết",
      render: ({ slug }) => <SliceHoverEllipsis value={slug} max={35} />,
    },

    {
      accessor: "category.name",
      sortable: true,
      title: "Danh mục",
      render: ({  category }) => category?.name ?? "",
    },


    {
      accessor: "createdAt",
      title: "Thời gian tạo",
      sortable: true,
      render: ({ createdAt }) => formatDate(createdAt),
    },

    {
      accessor: "updateAt",
      title: "Thời gian cập nhật",
      sortable: true,
      render: ({ updateAt }) => formatDate(updateAt),
    },

    {
      accessor: "actions",
      title: "Chức năng",
      textAlignment: "center",
      render(record) {
        return (
          <ButtonActionGroups>
            <ButtonAction content="Chỉnh sửa" color="blue">
              <TbEditCircle
                size={20}
                onClick={() => handleForm && handleForm(record)}
              />
            </ButtonAction>

            <ButtonAction content="Xóa" color="failure">
              <MdDelete
                size={20}
                onClick={() => handleDelete && handleDelete(record)}
              />
            </ButtonAction>
          </ButtonActionGroups>
        );
      },
    },
  ];
};
