"use client";
import { IJoditEditorProps } from "jodit-react";
import dynamic from "next/dynamic";
import { FC, memo, useMemo } from "react";
import ErrorHelperText from "./ErrorHelperText";
import WapperLabelForm, { WapperLabelFormProps } from "./WapperLabelForm";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export interface TextEditorProps
  extends Omit<WapperLabelFormProps, "children">,
    Omit<IJoditEditorProps, "value"> {
  msgError?: string;
  placeholder?: string;
  value?: string;
  ignoreButtons?: string[];
}

const TextEditorField: FC<TextEditorProps> = ({
  value,
  placeholder,
  msgError,
  label,
  isRequired,
  classWapper,
  isVertical,
  config,
  ignoreButtons,
  ...spread
}) => {
  const configCustom = useMemo(() => {
    let buttons: any[] = [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "undo",
      "redo",
      "|",
      "superscript",
      "subscript",
      "|",
      "align",
      "|",
      "ul",
      "ol",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "link",
      "table",
      "|",
      "hr",
      "eraser",
      "|",
      "source",
      "|",
      "preview",
    ];

    if (ignoreButtons) {
      buttons = buttons.filter((button) => !ignoreButtons.includes(button));
    }

    return {
      buttons,
      placeholder: placeholder || "Start typings...",
      height: "450px",
      maxWidth: "100%",
      maxHeight: "800px",
      allowResizeX: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      ...(config ?? {}),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder, config, ignoreButtons]);

  return (
    <WapperLabelForm
      isRequired={isRequired}
      label={label}
      classWapper={classWapper}
      isVertical={isVertical}
    >
      <JoditEditor
        value={value ?? ""}
        config={{ ...configCustom, editorClassName: "customer-editor" }}
        {...spread}
      />
      <ErrorHelperText isShow={!!msgError}>{msgError}</ErrorHelperText>
    </WapperLabelForm>
  );
};

export default memo(TextEditorField);
