/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import {
  ErrorHelperText,
  InputField,
  UploadFileField,
} from "@/components/customFormField";
import { FileListProps } from "@/components/customFormField/UploadFileField";
import { useCreateBanner } from "@/services/framework/banner/useCreateBanner";
import { useUpdateBanner } from "@/services/framework/banner/useUpdateBanner";
import { IBanner, IFormBanner } from "@/services/interface";
import { IModalDefaultProps } from "@/types";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useId } from "react";
import * as yup from "yup";

export interface ModalBannerProps extends IModalDefaultProps {
  currentData?: IBanner;
  onSuccess?: (data: IBanner) => void;
}

const validateSchemaBanner = yup.object().shape({
  file: yup.mixed().required("Vui lòng chọn hình ảnh"),
});

const ModalBanner: FC<ModalBannerProps> = ({
  isShow,
  setIsShow,
  currentData,
  onSuccess,
}) => {
  const idForm = useId();
  const { mutate: createBanner, isPending: isPendingCreate } =
    useCreateBanner();
  const { mutate: updateBanner, isPending: isPendingUpdate } =
    useUpdateBanner();
  const isProcessing = isPendingCreate || isPendingUpdate;

  const formik = useFormik<IFormBanner>({
    initialValues: {
      link: "",
      file: undefined,
    },
    validationSchema: currentData?.id
      ? validateSchemaBanner.omit(["file"])
      : validateSchemaBanner,
    onSubmit: (values) => {
      const { listFile, ...newData } = values;

      if (currentData?.id) {
        updateBanner(
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

      createBanner(newData, {
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
        link: currentData?.link ?? "",
        listFile: currentData?.image ? [{ url: currentData?.image }] : [],
      });
    }
  }, [currentData]);

  const handleClose = () => setIsShow && setIsShow(false);

  return (
    <Modal show={isShow} onClose={handleClose}>
      <Modal.Header>{currentData ? "Chỉnh sửa" : "Thêm"} banner</Modal.Header>
      <Modal.Body>
        <form id={idForm} className="space-y-3" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="link"
            placeholder="Nhập liên kết"
            label="Liên kết"
            isVertical
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

export default ModalBanner;
