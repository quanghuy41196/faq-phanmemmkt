/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ButtonFlowbite from "@/components/ButtonFlowbite";
import { ButtonAddCategory } from "@/components/ButtonModal";
import { InputField, TextEditorField } from "@/components/customFormField";
import { SelectScrollCategory } from "@/components/SelectScrollApi";
import { cn, slugUrl } from "@/helper/functions";
import { useCreatePosts } from "@/services/framework/posts/useCreatePosts";
import { useUpdatePosts } from "@/services/framework/posts/useUpdateProduct";
import {
  ICategory,
  IFormPost,
  IFormUpdatePost,
  IPost,
} from "@/services/interface";
import { IModalDefaultProps, refSelect } from "@/types";
import { Checkbox } from "@mantine/core";
import { Label, Modal } from "flowbite-react";
import { useFormik } from "formik";
import {
  FC,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import * as yup from "yup";

export interface ModalPostsProps extends IModalDefaultProps {
  currentData?: IPost;
  onSuccess?: (data: IPost) => void;
}

const validateSchemaPost = yup.object().shape({
  categoryId: yup.string().required("Vui lòng chọn danh mục"),
  basecontent: yup.string().required("Vui lòng nhập nội dung"),
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
  const refCategory = useRef<refSelect>(null);

  const formik = useFormik<IFormPost>({
    initialValues: {
      basecontent: "",
      categoryId: "",
      slug: "",
      title: "",
      isDependent: true
    },
    validationSchema: validateSchemaPost,
    onSubmit: (values) => {
      const { isDependent, ...rest } = values;
      if (currentData?.id) {
        const { basecontent, ...spread } = rest;
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

      createPost(rest, {
        onSuccess: (data) => {
          handleClose();
          onSuccess && onSuccess(data);
        },
      });
    },
  });

  useEffect(() => {
    if (currentData?.id) {
      const isDepen =
        (currentData?.slug ?? "") === slugUrl(currentData?.title ?? "");
      formik?.setValues({
        basecontent: currentData?.content?.content ?? "",
        categoryId: currentData?.category?.id ?? "",
        slug: currentData?.slug ?? "",
        title: currentData?.title ?? "",
        isDependent: isDepen,
      });
      setContent(currentData?.content?.content ?? "");
    }
  }, [currentData]);

  useEffect(() => {
    if (currentData?.id) {
      if (currentData?.category) {
        refCategory?.current?.uniqueOption?.(currentData?.category);
      }
    }
  }, [currentData, refCategory?.current]);

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

  const onSuccessCategory = useCallback(
    (data: ICategory) => {
      refCategory.current?.uniqueOption?.(data);
      formik.setFieldValue("categoryId", data?.id);
    },
    [refCategory]
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
                  onChange={() => handleCheckbox(formik?.values?.title ?? "")}
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
            <SelectScrollCategory
              formik={formik}
              isVertical
              isRequired
              ref={refCategory}
            />
            <ButtonAddCategory onSuccess={onSuccessCategory} />
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
