import { ButtonAction, ButtonActionGroups } from "@/components/ButtonAction";
import ImageViewModal from "@/components/ImageViewModal";
import SliceHoverEllipsis from "@/components/SliceHoverEllipsis";
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
      render: ({ name }) => <SliceHoverEllipsis value={name} max={40}/>,
    },

    {
      accessor: "slug",
      sortable: true,
      title: "Đường đẫn",
      render: ({ slug }) => <SliceHoverEllipsis value={slug} max={25}/>,
    },

    {
      accessor: "description",
      sortable: true,
      title: "Mô tả",
      render: ({ description }) => <SliceHoverEllipsis value={description} max={30}/>,
    },

    {
      accessor: "icon",
      title: "Hình ảnh",
      width: 120,
      render: ({ icon, name }) => <ImageViewModal src={icon} alt={name}/>
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
