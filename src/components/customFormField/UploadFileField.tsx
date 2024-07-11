"use client";
import {
  checkFileErrorType,
  validateCheckFileType,
  validateCheckSize,
} from "@/helper/validateFile";
import { Badge, Modal } from "flowbite-react";
import Image from "next/image";
import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  useId,
  useRef,
  useState,
} from "react";
import { IoMdAdd } from "react-icons/io";
import { IoCloseOutline, IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import WapperLabelForm, { WapperLabelFormProps } from "./WapperLabelForm";

export type paramsChangeFile = {
  files: File[];
};

export interface FileListProps {
  url: string;
  isDel?: boolean;
  originFileObj?: File;
}

export interface UploadFileFieldProps
  extends Omit<WapperLabelFormProps, "children"> {
  name?: string;
  checkFileError?: checkFileErrorType[];
  changeFile?: (obj: paramsChangeFile) => void;
  inputAttribute?: HTMLAttributes<HTMLInputElement>;
  maxFile?: number;
  multiple?: boolean;
  currentCount?: number;
  fileList?: FileListProps[];
  handleRemove?: (obj: {
    originListFile: FileListProps[];
    newListFile: FileListProps[];
  }) => void;
  accept?: string;
}

const initCheckFileError: checkFileErrorType[] = [
  {
    values: ["png", "jpeg", "jpg", "svg+xml"],
    msg: "Chỉ hỗ trợ tệp thuộc loại PNG，JPG，JPEG",
    checkFuc: validateCheckFileType,
  },

  {
    values: 5,
    msg: "Tài liệu quá lớn: tối đa 5MB",
    checkFuc: validateCheckSize,
  },

  // {
  //   values: ["300"],
  //   msg: "Kích thước ảnh phải lớn hơn 300 * 300px",
  //   checkFuc: validateWidthHeightImage,
  // },
];

const UploadFileField: FC<UploadFileFieldProps> = ({
  checkFileError = initCheckFileError,
  inputAttribute,
  name,
  changeFile,
  maxFile = 9,
  multiple = true,
  currentCount,
  handleRemove,
  fileList = [],
  accept = "image/*",
  isRequired,
  isVertical,
  classWapper,
  label,
}) => {
  const idInput = useId();
  const [srcView, setSrcView] = useState("");
  const [isShowView, setIsShowView] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList) => {
    let count = 0;
    let msg = "";
    let listFile: File[] = [];
    let index = 1;
    let isMaxFile = false;
    const countCheckFile = fileList?.filter((file) => file?.originFileObj);

    for (const file of Array.from(files)) {
      let isErrorFile = false;
      const maxFileTransfer = countCheckFile?.length + 1;
      const maxCountFile =
        (currentCount ? currentCount + index : maxFileTransfer) +
        listFile?.length;

      if (maxCountFile > maxFile) {
        isMaxFile = true;
        break;
      }

      for (const obj of checkFileError) {
        const { checkFuc, ...spread } = obj;
        const isError = await checkFuc({ file, ...spread });
        if (isError) {
          count += 1;
          msg = spread.msg;
          isErrorFile = true;
          break;
        }
      }

      if (!isMaxFile && !isErrorFile) {
        listFile.push(file);
        index += 1;
      }
    }
    if (fileRef.current) {
      fileRef.current.value = "";
      if (listFile?.length > 0) {
        changeFile &&
          changeFile({
            files: listFile,
          });
      }
    }
    msg &&
      toast.error(`${count > 1 ? `Có ${count} file không đúng quy tắc` : msg}`);
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      await processFiles(files);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...fileList];
    const fileDel = newItems.splice(index, 1);
    fileDel?.forEach((file) => URL.revokeObjectURL(file?.url ?? ""));
    handleRemove &&
      handleRemove({
        originListFile: fileList,
        newListFile: newItems,
      });
  };

  return (
    <WapperLabelForm
      isRequired={isRequired}
      label={label}
      classWapper={classWapper}
      isVertical={isVertical}
    >
      <div className="flex flex-wrap gap-2">
        {fileList?.map((item, index) => {
          return (
            <div
              className="flex items-center justify-center border rounded-lg w-[100px] h-[100px] cursor-pointer p-2 relative"
              key={index}
            >
              <div className="w-full h-full relative group overflow-hidden">
                <Image
                  src={item?.url ?? ""}
                  alt="Ảnh"
                  width={500}
                  height={500}
                />
                <div className="bg-[#00000073] absolute inset-0 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible select-none">
                  <IoEye
                    className="text-white cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    size={17}
                    onClick={() => {
                      setSrcView(item?.url);
                      setIsShowView(true);
                    }}
                  />
                </div>
              </div>
              {item?.isDel && (
                <Badge
                  color="failure"
                  className="rounded-full w-[17px] h-[17px] !px-0 flex items-center justify-center absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  onClick={() => handleRemoveItem(index)}
                >
                  <IoCloseOutline size={15} />
                </Badge>
              )}
            </div>
          );
        })}

        <label
          htmlFor={idInput}
          className="flex items-center justify-center border border-dashed rounded-lg w-[100px] h-[100px] cursor-pointer hover:border-blue-500"
        >
          <div className="flex flex-col items-center gap-1 select-none">
            <IoMdAdd size={17} />
            <span className="text-xs">Upload</span>
          </div>
        </label>
      </div>

      <input
        id={idInput}
        type="file"
        className="!hidden"
        name={name}
        multiple={multiple}
        {...inputAttribute}
        accept={accept}
        onChange={handleChangeFile}
        ref={fileRef}
      />

      <Modal
        popup
        size={"md"}
        show={isShowView}
        className="[&>div>div]:bg-transparent [&>div]:p-0 [&>div]:outline-0 [&>div>div]:shadow-none"
        dismissible
        onClose={() => {
          setIsShowView(false);
          setSrcView("");
        }}
      >
        <Image
          src={srcView}
          alt="hình ảnh"
          width={300}
          height={300}
          className="w-full rounded-xl"
        />
      </Modal>
    </WapperLabelForm>
  );
};

export default UploadFileField;
