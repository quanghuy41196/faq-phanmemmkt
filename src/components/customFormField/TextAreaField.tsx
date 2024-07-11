import { cn } from "@/helper/functions";
import { FC, TextareaHTMLAttributes } from "react";
import ErrorHelperText from "./ErrorHelperText";
import WapperLabelForm, { WapperLabelFormProps } from "./WapperLabelForm";

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<WapperLabelFormProps, "children"> {
  name: string;
  formik?: any;
  msgError?: string;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
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
      <textarea
        autoComplete="off"
        {...spread}
        name={name}
        id={name}
        onChange={formik ? formik.handleChange : spread?.onChange}
        onBlur={formik ? formik.handleBlur : spread?.onBlur}
        value={formik ? formik.values[name] : spread.value}
        className={cn(
          "form-textarea pr-9 focus:border-slate-300 w-full !outline-none",
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

export default TextAreaField;
