/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import {
  ErrorHelperText,
  InputField,
  UploadFileField,
} from "@/components/customFormField";
import { FileListProps } from "@/components/customFormField/UploadFileField";
import { useCreateCategory } from "@/services/framework/category/useCreateCategory";
import { useUpdateCategory } from "@/services/framework/category/useUpdateCategory";
import { ICategory, IFormDefault } from "@/services/interface";
import { IModalDefaultProps } from "@/types";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useId } from "react";
import * as yup from "yup";

export interface ModalTrustedProps extends IModalDefaultProps {
  currentData?: ICategory;
  onSuccess?: (data: ICategory) => void;
}

const validateSchemaCategory = yup.object().shape({
  name: yup.string().required("Vui lòng nhập liên kết"),
  file: yup.mixed().required("Vui lòng chọn hình ảnh"),
});

const ModalTrusted: FC<ModalTrustedProps> = ({
  isShow,
  setIsShow,
  currentData,
  onSuccess,
}) => {
  const idForm = useId();
  const { mutate: createCategory, isPending: isPendingCreate } =
    useCreateCategory();
  const { mutate: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory();
  const isProcessing = isPendingCreate || isPendingUpdate;

  const formik = useFormik<IFormDefault>({
    initialValues: {
      name: "",
      file: undefined,
    },
    validationSchema: currentData?.id
      ? validateSchemaCategory.omit(["file"])
      : validateSchemaCategory,
    onSubmit: (values) => {
      const { listFile, ...newData } = values;

      if (currentData?.id) {
        updateCategory(
          {
            id: currentData?.id,
            payload: newData,
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

      createCategory(newData, {
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
        listFile: currentData?.icon ? [{ url: currentData?.icon }] : [],
      });
    }
  }, [currentData]);

  const handleClose = () => setIsShow && setIsShow(false);

  return (
    <Modal show={isShow} onClose={handleClose}>
      <Modal.Header>{currentData ? "Chỉnh sửa" : "Thêm"} đối tác</Modal.Header>
      <Modal.Body>
        <form id={idForm} className="space-y-3" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="name"
            placeholder="Nhập liên kết"
            label="Liên kết"
            isVertical
            isRequired
          />

          <div>
            <UploadFileField
              name="file"
              isRequired
              isVertical
              label="Hình ảnh"
              maxFile={1}
              fileList={formik.values?.listFile ?? []}
              changeFile={({ files }) => {
                const currentFile = files?.[0];
                formik.setFieldValue("file", currentFile);
                const newArrayBill = files?.map((file) => ({
                  url: URL.createObjectURL(file),
                  isDel: true,
                  originFileObj: file,
                }));
                const newBill: FileListProps[] = [
                  ...newArrayBill,
                  ...(formik?.values?.listFile ?? []),
                ];
                formik.setFieldValue("listFile", newBill);
                formik.setFieldTouched("file", false);
              }}
              handleRemove={({ newListFile }) => {
                formik.setFieldValue("file", undefined);
                formik.setFieldValue("listFile", newListFile);
              }}
            />

            <ErrorHelperText
              isShow={!!(formik?.errors?.file && formik?.touched?.file)}
            >
              {formik?.errors?.file}
            </ErrorHelperText>
          </div>
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

export default ModalTrusted;
