import { ButtonAction, ButtonActionGroups } from "@/components/ButtonAction";
import SliceHoverEllipsis from "@/components/SliceHoverEllipsis";
import { formatDate } from "@/helper/functions";
import { IProduct } from "@/services/interface";
import { TDataColumnTable, configTableParams } from "@/types";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";

export const configTableProduct = ({
  handleDelete,
  handleForm,
}: configTableParams<IProduct>): TDataColumnTable<IProduct> => {
  return [
    {
      accessor: "image",
      title: "Hình ảnh",
      render: ({ image, name }) =>
        image ? (
          <Image
            src={image}
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
      accessor: "name",
      title: "Sản phẩm",
      sortable: true,
      render: ({ name }) => <SliceHoverEllipsis value={name} max={50} />,
    },

    {
      accessor: "slug",
      sortable: true,
      title: "Đường dẫn",
      render: ({ slug }) => <SliceHoverEllipsis value={slug} max={35}/>,
    },

    {
      accessor: "description",
      title: "Mô tả sản phẩm",
      sortable: true,
      render: ({ description }) => <SliceHoverEllipsis value={description} max={50} />,
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
