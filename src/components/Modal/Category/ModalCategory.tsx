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
import { cn, slugUrl } from "@/helper/functions";
import { useCreateCategory } from "@/services/framework/category/useCreateCategory";
import { useUpdateCategory } from "@/services/framework/category/useUpdateCategory";
import { ICategory, IFormCategory } from "@/services/interface";
import { IModalDefaultProps } from "@/types";
import { Checkbox } from "@mantine/core";
import { Label, Modal } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useEffect, useId } from "react";
import * as yup from "yup";

export interface ModalCategoryProps extends IModalDefaultProps {
  currentData?: ICategory;
  onSuccess?: (data: ICategory) => void;
}

const validateSchemaCategory = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên danh mục"),
  file: yup.mixed().required("Vui lòng chọn hình ảnh"),
  slug: yup.string().required("Vui lòng nhập đường dẫn")
});

const ModalCategory: FC<ModalCategoryProps> = ({
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

  const formik = useFormik<IFormCategory>({
    initialValues: {
      name: "",
      file: undefined,
      description: "",
      isDependent: true,
      slug: ""
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

  const handleSlug = (name: string) => {
    const slug = slugUrl(name);
    formik.setFieldValue("slug", slug);
  };

  const handleCheckbox = (value: string) => {
    const isDepen = !formik?.values?.isDependent;
    formik.setFieldValue("isDependent", isDepen);
    isDepen && handleSlug(value);
  };

  useEffect(() => {
    if (currentData?.id) {
      const isDepen = (currentData?.slug ?? "") === slugUrl(currentData?.name ?? "")
      formik?.setValues({
        name: currentData?.name ?? "",
        listFile: currentData?.icon ? [{ url: currentData?.icon }] : [],
        description: currentData?.description ?? "",
        isDependent: isDepen,
        slug: currentData?.slug ?? ""
      });
    }
  }, [currentData]);

  const handleClose = () => setIsShow && setIsShow(false);

  return (
    <Modal show={isShow} onClose={handleClose}>
      <Modal.Header>{currentData ? "Chỉnh sửa" : "Thêm"} danh mục</Modal.Header>
      <Modal.Body>
        <form id={idForm} className="space-y-3" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="name"
            placeholder="Nhập tên danh mục"
            label="Tên danh mục"
            isVertical
            isRequired
            onChange={(e) => {
              formik?.values?.isDependent && handleSlug(e.target.value);
            }}
          />

          <div className="flex gap-3">
            <InputField
              formik={formik}
              name="slug"
              placeholder="Nhập đường dẫn thân thiện"
              label="Đường dẫn"
              isVertical
              isRequired
              classWapper="flex-1"
              readOnly={formik?.values?.isDependent}
              disabled={formik?.values?.isDependent}
              className={cn(formik?.values?.isDependent && "!bg-gray-50")}
            />
            <div
              className={cn(
                "flex items-end",
                formik?.errors?.slug && formik?.touched?.slug ? "mb-9" : "mb-2"
              )}
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  color="indigo"
                  id={`checkbox-${idForm}`}
                  checked={formik?.values?.isDependent}
                  onChange={() => {
                    handleCheckbox(formik?.values?.name ?? "");
                  }}
                />
                <Label
                  htmlFor={`checkbox-${idForm}`}
                  className="cursor-pointer select-none"
                >
                  Lấy theo danh mục
                </Label>
              </div>
            </div>
          </div>

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

          <TextAreaField
            formik={formik}
            name="description"
            isVertical
            label="Mô tả"
            placeholder="Nhập mô tả"
            rows={4}
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

export default ModalCategory;
