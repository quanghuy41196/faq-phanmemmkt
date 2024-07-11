"use client";
import { cn } from "@/helper/functions";
import dynamic from "next/dynamic";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { components } from "react-select";
import { CreatableProps } from "react-select/creatable";
import ErrorHelperText from "./ErrorHelperText";
import WapperLabelForm, { WapperLabelFormProps } from "./WapperLabelForm";

interface CreatableSelectCustom extends CreatableProps<any, boolean, any> {
  onClearValue?: () => void;
  maxOptions?: number;
}

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
}) as FC<CreatableSelectCustom>;

const MenuList = ({ children, ...props }: any) => {
  const ComponentsMenuList = components.MenuList;
  return (
    <ComponentsMenuList {...props}>
      {
        Array.isArray(children)
          ? children.slice(0, props?.selectProps?.maxOptions ?? 3) // Options
          : children // NoOptionsLabel
      }
    </ComponentsMenuList>
  );
};

const ClearIndicator = (props: any) => {
  const clearValue = () => {
    if (props?.clearValue && props?.selectProps?.onClearValue) {
      props.clearValue();
      props.selectProps.onClearValue();
    }
  };

  const innerProps = {
    ...props.innerProps,
  };

  const ComponentsClearIndicator = components.ClearIndicator;

  return (
    <ComponentsClearIndicator {...props} {...innerProps}>
      <div
        onMouseDown={clearValue}
        onTouchEnd={clearValue}
        className="cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
        >
          <path
            d="M4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312L10.585938 12L4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031L12 13.414062L18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969L13.414062 12L19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688L12 10.585938L5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"
            fill="#5B5B5B"
          />
        </svg>
      </div>
    </ComponentsClearIndicator>
  );
};

export interface InputCompleteFieldProps
  extends CreatableSelectCustom,
    Omit<WapperLabelFormProps, "children"> {
  height?: string;
  name: string;
  formik?: any;
  msgError?: string;
  placeholder?: string;
  refSelect?: any;
  changeSelected?: (selected: any) => void;
  setValueSearch?: Dispatch<SetStateAction<string>>;
}

const InputCompleteField: FC<InputCompleteFieldProps> = ({
  options,
  height,
  formik,
  isMulti,
  placeholder,
  maxOptions,
  setValueSearch,
  changeSelected,
  onClearValue,
  name,
  label,
  isRequired,
  classWapper,
  isVertical,
  className,
  msgError,
  ...spread
}) => {
  const menuPortalRef = useRef<HTMLElement | undefined>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set menuPortalTarget when window is available
      menuPortalRef.current = window.document.body;
    }
  }, []); // Run once on component mount
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [clear, setClear] = useState(false);

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
    let serching = option.label
      .toLowerCase()
      .includes(inputValue.toLowerCase().replace(/^\s+|\s+$/gm, ""));

    let searching = (options ?? []).filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (searching.length <= 0) {
      setValueSearch && setValueSearch(inputValue);
    }

    return serching;
  };

  const handleSelectedOptionChange = (selectedOption: any) => {
    if (formik) {
      const defaultValue = isMulti ? [] : "";
      const values = isMulti
        ? selectedOption?.map((item: any) => item.value)
        : selectedOption?.value;
      formik?.setFieldValue(name, values ?? defaultValue);
    }
    changeSelected && changeSelected(selectedOption);
  };

  return (
    <WapperLabelForm
      isRequired={isRequired}
      label={label}
      classWapper={classWapper}
      isVertical={isVertical}
    >
      <CreatableSelect
        className={cn("shadow-sm", className)}
        options={options}
        components={{
          MenuList,
          DropdownIndicator: null,
          ClearIndicator,
        }}
        value={getValue()}
        styles={customStyles}
        isClearable
        menuIsOpen={menuIsOpen}
        menuPortalTarget={menuPortalRef.current}
        filterOption={customFilter}
        maxOptions={maxOptions}
        onChange={handleSelectedOptionChange}
        onInputChange={(newValue) => {
          if (newValue) {
            setMenuIsOpen(true);
          } else {
            setMenuIsOpen(false);
          }
        }}
        placeholder={placeholder}
        onClearValue={() => {
          onClearValue && onClearValue();
          setClear(!clear);
        }}
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

export default InputCompleteField;
