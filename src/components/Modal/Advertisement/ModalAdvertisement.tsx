/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import {
  ErrorHelperText,
  InputField,
  SelectField,
  UploadFileField,
} from "@/components/customFormField";
import { FileListProps } from "@/components/customFormField/UploadFileField";
import { optionsPositionAds, optionsStatusAds } from "@/config";
import { useCreateAds } from "@/services/framework/ads/useCreateAds";
import { useUpdateAds } from "@/services/framework/ads/useUpdateAds";
import { IAds, IFormAds, IFormDefault } from "@/services/interface";
import { IModalDefaultProps } from "@/types";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useId } from "react";
import * as yup from "yup";

export interface ModalAdvertisementProps extends IModalDefaultProps {
  currentData?: IAds;
  onSuccess?: (data: IAds) => void;
}

const validateSchemaAds = yup.object().shape({
  file: yup.mixed().required("Vui lòng chọn hình ảnh"),
});

const ModalAdvertisement: FC<ModalAdvertisementProps> = ({
  isShow,
  setIsShow,
  currentData,
  onSuccess,
}) => {
  const idForm = useId();
  const { mutate: createAds, isPending: isPendingCreate } =
    useCreateAds();
  const { mutate: updateAds, isPending: isPendingUpdate } =
    useUpdateAds();
  const isProcessing = isPendingCreate || isPendingUpdate;

  const formik = useFormik<IFormAds>({
    initialValues: {
      link: "",
      file: undefined,
      active: true,
      listFile: [],
      position: false,
    },
    validationSchema: currentData?.id
      ? validateSchemaAds.omit(["file"])
      : validateSchemaAds,
    onSubmit: (values) => {
      const { listFile, ...newData } = values;

      if (currentData?.id) {
        updateAds(
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

      createAds(newData, {
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
        active: currentData?.active ?? true,
        position: currentData?.position ?? false
      });
    }
  }, [currentData]);

  const handleClose = () => setIsShow && setIsShow(false);

  return (
    <Modal show={isShow} onClose={handleClose}>
      <Modal.Header>
        {currentData ? "Chỉnh sửa" : "Thêm"} quảng cáo
      </Modal.Header>
      <Modal.Body>
        <form id={idForm} className="space-y-3" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="link"
            placeholder="Nhập liên kết"
            label="Liên kết"
            isVertical
          />

          <SelectField
            formik={formik}
            name="position"
            placeholder="Chọn vị trí hiển thị"
            label="Vị trí hiển thị"
            isVertical
            options={optionsPositionAds}
          />

          <SelectField
            formik={formik}
            name="active"
            placeholder="Chọn trạng thái"
            label="Trạng thái"
            isVertical
            options={optionsStatusAds}
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

export default ModalAdvertisement;
