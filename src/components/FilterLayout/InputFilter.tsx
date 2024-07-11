
import { cn } from "@/helper/functions";
import { FC, useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import ButtonFlowbite from "../ButtonFlowbite";
import { InputField } from "../customFormField";
import { InputFieldProps } from "../customFormField/InputField";

interface InputFilterProps extends InputFieldProps {
  onChangeValue?: (value: string) => void;
}

const InputFilter: FC<InputFilterProps> = ({ onChangeValue, ...spread }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const submitedForm = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onChangeValue && onChangeValue((value ?? "").trim());
      } else if (e.key === "Escape") {
        setValue("");
        onChangeValue && onChangeValue("");
      }
    };

    window.addEventListener("keydown", submitedForm);
    return () => {
      window.removeEventListener("keydown", submitedForm);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex items-center gap-1 lg:!w-[17.7rem]">
      <div className="flex-1 relative">
        <InputField
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          classWapper="[&>*]:h-[42px]"
          className={cn("text-ellipsis h-full", !!value && "!pr-[1.45rem]")}
          title={spread?.placeholder}
          {...spread}
        />
        {value && (
          <IoClose
            className="absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer text-[#cccccc] select-none"
            onClick={() => {
              setValue("");
              onChangeValue && onChangeValue("");
            }}
            size={20}
          />
        )}
      </div>

      <ButtonFlowbite
        color="blue"
        className="p-1 [&>*]:p-0 h-full w-[38px] items-center"
        onClick={() => onChangeValue && onChangeValue((value ?? "").trim())}
      >
        <IoSearch size={20} />
      </ButtonFlowbite>
    </div>
  );
};

export default InputFilter;
