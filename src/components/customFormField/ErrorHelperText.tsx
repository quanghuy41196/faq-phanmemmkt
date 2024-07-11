import { FC, PropsWithChildren } from "react";

interface ErrorHelperTextProps extends PropsWithChildren {
  isShow?: boolean;
}

const ErrorHelperText: FC<ErrorHelperTextProps> = ({ isShow, children }) => {
  return (
    <>
      {isShow && (
        <span className="text-sm text-red-600 block mt-2">
          {children ?? ""}
        </span>
      )}
    </>
  );
};

export default ErrorHelperText;
