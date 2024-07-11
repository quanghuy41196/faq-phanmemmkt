/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import {
  ErrorHelperText,
  InputField,
  TextAreaField,
  UploadFileField,
} from "@/components/customFormField";
import { FileListProps } from "@/components/customFormField/UploadFileField";
import { useCreateProduct } from "@/services/framework/products/useCreateProduct";
import { useUpdateProduct } from "@/services/framework/products/useUpdateProduct";
import { IFormProduct, IProduct } from "@/services/interface";
import { IModalDefaultProps } from "@/types";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useId } from "react";
import * as yup from "yup";

export interface ModalFeeatureProps extends IModalDefaultProps {
  currentData?: IProduct;
  onSuccess?: (data: IProduct) => void;
}

const validateSchemaProduct = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  file: yup.mixed().required("Vui lòng chọn hình ảnh"),
});

const ModalFeeature: FC<ModalFeeatureProps> = ({
  isShow,
  setIsShow,
  currentData,
  onSuccess
}) => {
  const idForm = useId();
  const { mutate: createProduct, isPending: isPendingCreate } =
    useCreateProduct();
  const { mutate: updateProduct, isPending: isPendingUpdate } =
    useUpdateProduct();
  const isProcessing = isPendingCreate || isPendingUpdate;

  const formik = useFormik<IFormProduct>({
    initialValues: {
      name: "",
      file: undefined,
      description: "",
    },
    validationSchema: currentData?.id
      ? validateSchemaProduct.omit(["file"])
      : validateSchemaProduct,
    onSubmit: (values) => {
      const { listFile, ...newData } = values;

      if (currentData?.id) {
        updateProduct(
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

      createProduct(newData, {
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
        listFile: currentData?.image ? [{ url: currentData?.image }] : [],
        description: currentData?.description ?? "",
        slug: currentData?.slug ?? "",
      });
    }
  }, [currentData]);

  const handleClose = () => setIsShow && setIsShow(false);

  return (
    <Modal show={isShow} onClose={handleClose}>
      <Modal.Header>{currentData ? "Chỉnh sửa" : "Thêm"} tính năng</Modal.Header>
      <Modal.Body>
        <form id={idForm} className="space-y-3" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="name"
            placeholder="Nhập tên tính năng"
            label="Tên tính năng"
            isVertical
            isRequired
          />

          <InputField
            formik={formik}
            name="slug"
            placeholder="Nhập liên kết"
            label="Liên kết"
            isVertical
          />

          <TextAreaField
            formik={formik}
            name="description"
            isVertical
            rows={3}
            label="Mô tả"
            placeholder="Nhập mô tả"
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

export default ModalFeeature;
