import { ButtonAction, ButtonActionGroups } from "@/components/ButtonAction";
import { formatDate } from "@/helper/functions";
import { ICategory } from "@/services/interface";
import { TDataColumnTable, configTableParams } from "@/types";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";

export const configTableCategory = ({
  handleDelete,
  handleForm,
}: configTableParams<ICategory>): TDataColumnTable<ICategory> => {
  return [
    {
      accessor: "name",
      sortable: true,
      title: "Danh mục",
    },

    {
      accessor: "icon",
      title: "Hình ảnh",
      width: 120,
      render: ({ icon, name }) =>
        icon ? (
          <Image
            src={icon}
            alt={name}
            width={40}
            height={40}
            className="cursor-pointer"
          />
        ) : (
          "-"
        ),
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
