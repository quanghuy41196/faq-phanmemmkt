import { ButtonAction, ButtonActionGroups } from "@/components/ButtonAction";
import ImageViewModal from "@/components/ImageViewModal";
import SliceHoverEllipsis from "@/components/SliceHoverEllipsis";
import { formatDate } from "@/helper/functions";
import { IAds } from "@/services/interface";
import { TDataColumnTable, configTableParams } from "@/types";
import { ToggleSwitch } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import { optionsPositionAds } from "../options";

export interface IConfigTableAdvertisement extends configTableParams<IAds> {
  handleChangeStatus?: (id: string, active: boolean) => void;
  objStatus?: any;
  isPending?: boolean;
}

export const configTableAdvertisement = ({
  handleDelete,
  handleForm,
  handleChangeStatus,
  isPending,
  objStatus,
}: IConfigTableAdvertisement): TDataColumnTable<IAds> => {
  return [
    {
      accessor: "image",
      title: "Hình ảnh",
      width: 120,
      render: ({ image, link }) => <ImageViewModal src={image} alt={link} />,
    },

    {
      accessor: "link",
      title: "Liên kết",
      render: ({ link }) => <SliceHoverEllipsis value={link} max={40} />,
    },

    {
      accessor: "position",
      title: "Vị trí",
      render: ({ position }) => {
        const currnetPostion = optionsPositionAds?.find(
          (opt) => opt?.value === position
        );
        return currnetPostion?.label ?? "";
      },
    },

    {
      accessor: "active",
      title: "Trạng thái",
      render: ({ active, id }) => {
        const isActive =
          objStatus && Object.hasOwn(objStatus, id) ? objStatus?.[id] : active;

        return (
          <ToggleSwitch
            disabled={isPending}
            checked={isActive}
            onChange={() =>
              handleChangeStatus && handleChangeStatus(id, isActive)
            }
          />
        );
      },
    },

    {
      accessor: "createAt",
      title: "Thời gian tạo",
      sortable: true,
      render: ({ createAt }) => formatDate(createAt),
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
