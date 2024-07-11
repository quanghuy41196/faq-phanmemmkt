/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { SelectField } from "@/components/customFormField";
import { getValueSelected } from "@/helper/functions";
import useSelect from "@/hooks/useSelect";
import useGetAllProducts from "@/services/framework/products/useGetAllProducts";
import { SelectScrollBaseProps, refSelect } from "@/types";
import _ from "lodash";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle
} from "react";

const SelectScrollProducts: ForwardRefRenderFunction<
  refSelect,
  SelectScrollBaseProps
> = (
  {
    name = "productId",
    label = "Sản phẩm",
    placeholder = "Chọn sản phẩm",
    funCustomValue,
    params,
    ...spread
  },
  ref
) => {
  const { options, setOptions, setPaginationScroll, isFetching, renderOption } =
    useSelect({
      callApi: ({ limit, page }) =>
        useGetAllProducts({ page, limit, ...(params ?? {}) }),
      renderOption: (data) => {
        return data?.items?.map((item) => ({
          label: item?.name,
          value: item?.id,
          originValue: item,
        }));
      },
    });

  useImperativeHandle(
    ref,
    () => {
      return {
        setOptions,
        options,
        uniqueOption(data) {
          let currentData = data ? data : [];
          currentData = Array.isArray(data) ? data : [data];
          const optionRender = renderOption({
            items: currentData,
            count: 0,
            page: 0,
            limit: 0,
          });
          setOptions((prev) => _.uniqBy([...prev, ...optionRender], "value"));
        },
      };
    },
    [setOptions, options, renderOption]
  );

  return (
    <SelectField
      label={label}
      name={name}
      options={options ?? []}
      classWapper="flex-1"
      placeholder={placeholder}
      onMenuScrollToBottom={setPaginationScroll}
      isLoading={isFetching}
      {...spread}
      value={
        spread?.formik
          ? undefined
          : funCustomValue
          ? funCustomValue(spread?.value, options)
          : getValueSelected(spread?.value, options)
      }
    />
  );
};

export default forwardRef(SelectScrollProducts);
