"use client";
import { cn, convertViToEn } from "@/helper/functions";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Props } from "react-select";
import ErrorHelperText from "./ErrorHelperText";
import WapperLabelForm, { WapperLabelFormProps } from "./WapperLabelForm";
const Select = dynamic(() => import("react-select"), { ssr: false });

export interface CustomSelectProps
  extends Props,
    Omit<WapperLabelFormProps, "children"> {
  className?: string;
  height?: string;
  name: string;
  formik?: any;
  msgError?: string;
  changeSelected?: (selected?: any) => void;
  setValueSearch?: Dispatch<SetStateAction<string>>;
}

export const SelectField: FC<CustomSelectProps> = ({
  className,
  placeholder,
  options,
  isMulti = false,
  label,
  classWapper,
  isRequired,
  name,
  formik,
  height = "42px",
  isVertical,
  msgError,
  changeSelected,
  value,
  setValueSearch,
  ...spread
}) => {
  const menuPortalRef = useRef<HTMLElement | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set menuPortalTarget when window is available
      menuPortalRef.current = window.document.body;
    }
  }, []); // Run once on component mount

  const onChange = (option: any) => {
    if (formik) {
      if (!option) {
        formik?.setFieldValue(name, isMulti ? [] : "");
      } else {
        formik?.setFieldValue(
          name,
          isMulti ? option.map((item: any) => item.value) : option.value
        );
      }
    }
    changeSelected && changeSelected(option);
  };

  const getValue = () => {
    if (options && formik) {
      return isMulti
        ? options.filter(
            (option: any) => formik?.values?.[name]?.indexOf(option.value) >= 0
          )
        : options.filter(
            (option: any) => option.value === formik?.values?.[name]
          );
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "#FFFFFF",
      // Overwrittes the different states of border
      borderColor: "rgb(226 232 240 / 1)",
      textAlign: "left",

      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      height: height ?? "38px",
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "rgb(226 232 240 / 1)",

        backgroundColor: "rgb(248 250 252 / 1)",
      },
      "&:focus": {
        // Overwrittes the different states of border
        color: "#495057",
        backgroundColor: "#fff",
        borderColor: "#80bdff",
        outline: 0,
        boxShadow: "0 0 0 0.2rem rgb(0 123 255 / 25%)",
      },
    }),
    container: (base: any) => ({
      ...base,
      width: "100%",
    }),
    IndicatorsContainer2: (base: any) => ({
      ...base,
      borderColor: "transparent",
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      width: 0,
    }),
    menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
    menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
  };

  const customFilter = (option: any, inputValue: any) => {
    const labelValue = convertViToEn(option.label ?? "");
    const valueString = convertViToEn(inputValue ?? "").replace(
      /^\s+|\s+$/gm,
      ""
    );
    let serching = labelValue.includes(valueString);
    setValueSearch && setValueSearch(inputValue);
    // let searching = (options ?? []).filter(
    //   (item: any) => convertViToEn(item.label ?? "")?.includes(valueString)
    // );

    // if (searching.length <= 0) {
    //   setValueSearch && setValueSearch(inputValue);
    // }

    return serching;
  };

  return (
    <WapperLabelForm
      isRequired={isRequired}
      label={label}
      classWapper={classWapper}
      isVertical={isVertical}
    >
      <Select
        className={cn("shadow-sm", className)}
        name={name}
        value={formik ? getValue() : value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        styles={customStyles}
        filterOption={customFilter}
        menuPortalTarget={menuPortalRef.current}
        onBlur={formik ? formik?.handleBlur : spread?.onBlur}
        {...spread}
      />

      <ErrorHelperText
        isShow={
          (formik && formik?.touched?.[name] && formik?.errors?.[name]) ||
          msgError
        }
      >
        {msgError ? msgError : formik?.errors?.[name]}
      </ErrorHelperText>
    </WapperLabelForm>
  );
};

export default SelectField;
