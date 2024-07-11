import {
  checkNegative,
  cn,
  convertNumber,
  numberMoneyVND,
} from "@/helper/functions";
import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useRef,
} from "react";
import ErrorHelperText from "./ErrorHelperText";
import WapperLabelForm, { WapperLabelFormProps } from "./WapperLabelForm";

interface InputNumerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">,
    Omit<WapperLabelFormProps, "children"> {
  name: string;
  formik?: any;
  isFormatPrice?: boolean;
  suffixes?: string;
  maxValue?: number;
  onChange?: (value: number) => void;
  msgError?: string;
  isNegative?: boolean;
  isFirstZeno?: boolean;
}

const InputNumberField: FC<InputNumerProps> = ({
  formik,
  name,
  label,
  isRequired,
  classWapper,
  isVertical,
  isFormatPrice,
  suffixes,
  maxValue = 99999999999999,
  onChange,
  msgError,
  isNegative,
  isFirstZeno = false,
  ...rest
}) => {
  const value = formik ? formik?.values?.[name] : rest.value;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { check } = convertNumber(e.key);
    const arrWhich = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "KeyC"];

    if (e.keyCode === 189 && isNegative) {
      const valueNegative = (e.target as HTMLInputElement).value;
      const isCheckNegative = valueNegative === "-";
      if (!isCheckNegative) {
        return;
      }
    }

    if (!check) {
      if (
        arrWhich.includes(e.key) ||
        (e.ctrlKey &&
          (e.keyCode === 65 || e.keyCode === 86 || e.keyCode === 67))
      ) {
        return;
      }
      e.preventDefault();
    }

    const { value } = convertNumber((e.target as HTMLInputElement).value);
    const isCheckNegative = checkNegative(value?.toString());
    const newValue = isCheckNegative ? value * -1 : value;
    if (maxValue && newValue >= maxValue) {
      (e.target as HTMLInputElement).value = isCheckNegative
        ? (maxValue * -1).toString()
        : maxValue?.toString();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = convertNumber(e.target.value);
    const isCheckNegative = e.target.value === "-";

    let formattedValue: number = value;
    if (maxValue && value >= maxValue) {
      formattedValue = maxValue;
    }

    if (formik) {
      formik?.setFieldValue(name, isCheckNegative && isNegative ? "-" : value);
    } else {
      e.target.value = formattedValue?.toString();
    }

    if (isCheckNegative) return;
    onChange && onChange(formattedValue);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const { check } = convertNumber(event.clipboardData.getData("Text"));
    !check && event.preventDefault();
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) => {
    const { check } = convertNumber(event.target.value);
    if (!check) {
      if (formik) {
        formik?.setFieldValue(name, 0);
      } else {
        event.target.value = "";
      }
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (formik) {
      formik?.handleBlur?.(event);
    } else {
      rest?.onBlur?.(event);
    }

    const value = event.target.value;
    if (value === "-" && isNegative) {
      if (formik) {
        formik?.setFieldValue(name, 0);
      } else {
        event.target.value = "";
      }
    }
  };

  const valueFormatPrice = (value: any) => {
    let newValue = value;
    if (isNegative && newValue === "-") return "-";

    if (isFormatPrice) {
      newValue = numberMoneyVND(value);
    }

    if (!isFirstZeno && (newValue === "0" || newValue === 0)) newValue = "";

    return newValue;
  };

  return (
    <WapperLabelForm
      isRequired={isRequired}
      label={label}
      classWapper={classWapper}
      isVertical={isVertical}
    >
      <div
        className={cn(
          "relative text-[#505050] flex items-center",
          "form-input pr-9 focus:border-slate-300 w-full !outline-none"
        )}
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
      >
        <input
          ref={inputRef}
          name={name}
          className={`w-full h-full bg-transparent border-none outline-none`}
          autoComplete="off"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
          value={valueFormatPrice(value)}
        />

        {suffixes && (
          <span className="flex items-center justify-center mx-3">
            {suffixes}
          </span>
        )}
      </div>

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

export default InputNumberField;
