import { ButtonAction, ButtonActionGroups } from "@/components/ButtonAction";
import ImageViewModal from "@/components/ImageViewModal";
import SliceHoverEllipsis from "@/components/SliceHoverEllipsis";
import { formatDate } from "@/helper/functions";
import { IProduct } from "@/services/interface";
import { TDataColumnTable, configTableParams } from "@/types";
import { MdDelete } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";

export const configTableFeeature = ({
  handleDelete,
  handleForm,
}: configTableParams<IProduct>): TDataColumnTable<IProduct> => {
  return [
    {
      accessor: "image",
      title: "Hình ảnh",
      render: ({ image, name }) => <ImageViewModal src={image} alt={name} />,
    },

    {
      accessor: "name",
      title: "Tính năng",
      sortable: true,
      render: ({ name }) => <SliceHoverEllipsis value={name} max={50} />,
    },

    {
      accessor: "slug",
      sortable: true,
      title: "Liên kết",
      render: ({ slug }) => <SliceHoverEllipsis value={slug} max={35} />,
    },

    {
      accessor: "description",
      title: "Mô tả",
      sortable: true,
      render: ({ description }) => (
        <SliceHoverEllipsis value={description} max={50} />
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
