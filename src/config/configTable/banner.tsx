import { ButtonAction, ButtonActionGroups } from "@/components/ButtonAction";
import ImageViewModal from "@/components/ImageViewModal";
import SliceHoverEllipsis from "@/components/SliceHoverEllipsis";
import { formatDate } from "@/helper/functions";
import { IBanner } from "@/services/interface";
import { TDataColumnTable, configTableParams } from "@/types";
import { MdDelete } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";

export const configTableBanner = ({
  handleDelete,
  handleForm,
}: configTableParams<IBanner>): TDataColumnTable<IBanner> => {
  return [
    {
      accessor: "image",
      title: "Hình ảnh",
      width: 120,
      render: ({ image, link }) => <ImageViewModal src={image} alt={link} />,
    },
    {
      accessor: "link",
      sortable: true,
      title: "Liên kết",
      render: ({ link }) => <SliceHoverEllipsis value={link} max={40} />,
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
