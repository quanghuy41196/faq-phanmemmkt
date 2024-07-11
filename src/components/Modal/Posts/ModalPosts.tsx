/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import {
  ButtonAddCategory,
  ButtonAddGroup,
  ButtonAddProduct,
} from "@/components/ButtonModal";
import {
  SelectScrollCategory,
  SelectScrollGroup,
  SelectScrollProducts,
} from "@/components/SelectScrollApi";
import { InputField, TextEditorField } from "@/components/customFormField";
import { cn, slugUrl } from "@/helper/functions";
import { useCreatePosts } from "@/services/framework/posts/useCreatePosts";
import { useUpdatePosts } from "@/services/framework/posts/useUpdateProduct";
import {
  ICategory,
  IFormPost,
  IFormUpdatePost,
  IGroup,
  IPost,
  IProduct,
} from "@/services/interface";
import { IModalDefaultProps, refSelect } from "@/types";
import { Checkbox } from "@mantine/core";
import { Label, Modal } from "flowbite-react";
import { useFormik } from "formik";
import { FC, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import * as yup from "yup";

export interface ModalPostsProps extends IModalDefaultProps {
  currentData?: IPost;
  onSuccess?: (data: IPost) => void;
}

const validateSchemaPost = yup.object().shape({
  categoryId: yup.string().required("Vui lòng chọn danh mục"),
  productId: yup.string().required("Vui lòng chọn sản phẩm"),
  basecontent: yup.string().required("Vui lòng nhập nội dung"),
  groupId: yup.string().required("Vui lòng chọn nhóm"),
  slug: yup.string().required("Vui lòng nhập đường dẫn"),
  title: yup.string().required("Vui lòng nhập tiêu đề"),
});

const ModalPosts: FC<ModalPostsProps> = ({
  isShow,
  setIsShow,
  currentData,
  onSuccess,
}) => {
  const idForm = useId();
  const [content, setContent] = useState("");
  const { mutate: createPost, isPending: isPendingCreate } = useCreatePosts();
  const { mutate: updatePost, isPending: isPendingUpdate } = useUpdatePosts();
  const isProcessing = isPendingCreate || isPendingUpdate;
  const refGroup = useRef<refSelect>(null);
  const refCategory = useRef<refSelect>(null);
  const refProduct = useRef<refSelect>(null);

  const formik = useFormik<IFormPost>({
    initialValues: {
      basecontent: "",
      categoryId: "",
      productId: "",
      slug: "",
      groupId: "",
      title: "",
      isDependent: true,
    },
    validationSchema: validateSchemaPost,
    onSubmit: (values) => {
      if (currentData?.id) {
        const { basecontent, ...spread } = values;
        const newData: IFormUpdatePost = {
          ...spread,
          id: currentData?.id,
          content: {
            content: basecontent,
          },
        };
        updatePost(newData, {
          onSuccess: (data) => {
            handleClose();
            onSuccess && onSuccess(data);
          },
        });
        return;
      }

      createPost(values, {
        onSuccess: (data) => {
          handleClose();
          onSuccess && onSuccess(data);
        },
      });
    },
  });

  useEffect(() => {
    if (currentData?.id) {
      const isDepen = (currentData?.slug ?? "") === slugUrl(currentData?.title ?? "")
      formik?.setValues({
        basecontent: currentData?.content?.content ?? "",
        categoryId: currentData?.category?.id ?? "",
        productId: currentData?.product?.id ?? "",
        slug: currentData?.slug ?? "",
        groupId: currentData?.group?.id ?? "",
        title: currentData?.title ?? "",
        isDependent: isDepen
      });
      setContent(currentData?.content?.content ?? "");
    }
  }, [currentData]);

  useEffect(() => {
    if (currentData?.id) {
      if (currentData?.category) {
        refCategory?.current?.uniqueOption?.(currentData?.category);
      }

      if (currentData?.product) {
        refProduct?.current?.uniqueOption?.(currentData?.product);
      }

      if (currentData?.group) {
        refGroup?.current?.uniqueOption?.(currentData?.group);
      }
    }
  }, [
    currentData,
    refGroup?.current,
    refProduct?.current,
    refCategory?.current,
  ]);

  const handleClose = useCallback(() => setIsShow && setIsShow(false), []);

  const handleSlug = (name: string) => {
    const slug = slugUrl(name);
    formik.setFieldValue("slug", slug);
  };

  const handleCheckbox = (value: string) => {
    const isDepen = !formik?.values?.isDependent;
    formik.setFieldValue("isDependent", isDepen);
    isDepen && handleSlug(value);
  };

  const onBlurContent = useCallback((value: string) => {
    setContent(value);
    formik.setFieldValue("basecontent", value);
    formik.setFieldTouched("basecontent", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const msgErrorContent = useMemo(() => {
    return formik?.errors?.basecontent && formik?.touched?.basecontent
      ? formik?.errors?.basecontent
      : "";
  }, [formik?.errors?.basecontent, formik?.touched?.basecontent]);

  const onSuccessProduct = useCallback(
    (data: IProduct) => {
      refProduct.current?.uniqueOption?.(data);
      formik.setFieldValue("productId", data?.id);
    },
    [refProduct]
  );

  const onSuccessCategory = useCallback(
    (data: ICategory) => {
      refCategory.current?.uniqueOption?.(data);
      formik.setFieldValue("categoryId", data?.id);
    },
    [refProduct]
  );

  const onSuccessGroup = useCallback(
    (data: IGroup) => {
      refGroup.current?.uniqueOption?.(data);
      formik.setFieldValue("groupId", data?.id);
    },
    [refProduct]
  );

  return (
    <Modal show={isShow} onClose={handleClose} size={"7xl"}>
      <Modal.Header>{currentData ? "Chỉnh sửa" : "Thêm"} bài viết</Modal.Header>
      <Modal.Body>
        <form id={idForm} className="space-y-3" onSubmit={formik.handleSubmit}>
          <InputField
            formik={formik}
            name="title"
            isVertical
            isRequired
            placeholder="Nhập tiêu đề"
            label="Tiêu đề"
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
                    handleCheckbox(formik?.values?.title ?? "");
                  }}
                />
                <Label
                  htmlFor={`checkbox-${idForm}`}
                  className="cursor-pointer select-none"
                >
                  Lấy theo tiêu đề
                </Label>
              </div>
            </div>
          </div>

          <div className="flex w-full items-start gap-[15px]">
            <SelectScrollProducts
              formik={formik}
              isVertical
              isRequired
              ref={refProduct}
            />
            <ButtonAddProduct onSuccess={onSuccessProduct} />
          </div>

          <div className="flex w-full items-start gap-[15px]">
            <SelectScrollCategory
              formik={formik}
              isVertical
              isRequired
              ref={refCategory}
            />
            <ButtonAddCategory onSuccess={onSuccessCategory} />
          </div>
          <div className="flex w-full items-start gap-[15px]">
            <SelectScrollGroup
              formik={formik}
              isVertical
              isRequired
              ref={refGroup}
            />
            <ButtonAddGroup onSuccess={onSuccessGroup} />
          </div>

          <TextEditorField
            label="Nội dung"
            placeholder="Nhập nội dung"
            isVertical
            isRequired
            value={content}
            onBlur={onBlurContent}
            msgError={msgErrorContent}
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

export default ModalPosts;
