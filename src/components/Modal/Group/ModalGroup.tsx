/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { InputField } from "@/components/customFormField";
import { useCreateGroup } from "@/services/framework/group/useCreateGroup";
import { useUpdateGroup } from "@/services/framework/group/useUpdateGroup";
import { IFormGroup, IGroup } from "@/services/interface";
import { IModalDefaultProps } from "@/types";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useId } from "react";
import * as yup from "yup";

export interface ModalGroupProps extends IModalDefaultProps {
  currentData?: IGroup;
  onSuccess?: (data: IGroup) => void;
}

const validateSchemaGroup = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên nhóm"),
});

const ModalGroup: FC<ModalGroupProps> = ({
  isShow,
  setIsShow,
  currentData,
  onSuccess,
}) => {
  const idForm = useId();
  const { mutate: createGroup, isPending: isPendingCreate } = useCreateGroup();
  const { mutate: updateGroup, isPending: isPendingUpdate } = useUpdateGroup();
  const isProcessing = isPendingCreate || isPendingUpdate;

  const formik = useFormik<IFormGroup>({
    initialValues: {
      name: "",
    },
    validationSchema: validateSchemaGroup,
    onSubmit: (values) => {
      if (currentData?.id) {
        updateGroup(
          {
            id: currentData?.id,
            ...values,
          },
          {
            onSuccess: (data) => {
              handleClose();
              onSuccess && onSuccess(data);
            },
          }
        );
        return;
      }

      createGroup(values, {
        onSuccess: (data) => {
          handleClose();
          onSuccess && onSuccess(data);
        },
      });
    },
  });

  useEffect(() => {
    if (currentData?.id) {
      formik?.setValues({
        name: currentData?.name ?? "",
      });
    }
  }, [currentData]);

  const handleClose = () => setIsShow && setIsShow(false);

  return (
    <Modal show={isShow} onClose={handleClose}>
      <Modal.Header>{currentData ? "Chỉnh sửa" : "Thêm"} Nhóm</Modal.Header>
      <Modal.Body>
        <form id={idForm} className="space-y-3" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="name"
            placeholder="Nhập tên nhóm"
            label="Tên nhóm"
            isVertical
            isRequired
          />
        </form>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <ButtonFlowbite
          color="failure"
          onClick={handleClose}
          disabled={isProcessing}
        >
          Hủy
        </ButtonFlowbite>
        <ButtonFlowbite
          type="submit"
          color="blue"
          form={idForm}
          isProcessing={isProcessing}
        >
          {currentData?.id ? "Cập nhật" : "Đồng ý"}
        </ButtonFlowbite>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalGroup;
