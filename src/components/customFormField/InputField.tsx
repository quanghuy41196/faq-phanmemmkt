import { cn } from "@/helper/functions";
import { FC, InputHTMLAttributes } from "react";
import ErrorHelperText from "./ErrorHelperText";
import WapperLabelForm, { WapperLabelFormProps } from "./WapperLabelForm";

export interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    Omit<WapperLabelFormProps, "children"> {
  name: string;
  formik?: any;
  msgError?: string;
}

const InputField: FC<InputFieldProps> = ({
  formik,
  name,
  label,
  isRequired,
  classWapper,
  isVertical,
  msgError,
  ...spread
}) => {
  return (
    <WapperLabelForm
      isRequired={isRequired}
      label={label}
      classWapper={classWapper}
      isVertical={isVertical}
    >
      <input
        autoComplete="off"
        {...spread}
        name={name}
        id={name}
        onChange={
          formik
            ? (e) => {
                formik?.handleChange?.(e);
                spread?.onChange?.(e);
              }
            : spread?.onChange
        }
        onBlur={
          formik
            ? (e) => {
                formik?.handleBlur?.(e);
                spread?.onBlur?.(e);
              }
            : spread?.onBlur
        }
        value={formik ? formik.values[name] : spread.value}
        className={cn(
          "form-input pr-9 focus:border-slate-300 w-full !outline-none",
          spread?.className
        )}
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

export default InputField;
