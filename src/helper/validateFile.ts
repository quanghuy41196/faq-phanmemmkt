export type checkFileErrorType = {
  values: string[] | string | number;
  isMax?: boolean;
  msg: string;
  checkFuc: (
    obj: argumentCheckFuc
  ) => returnCheckFuc | void | Promise<returnCheckFuc | void>;
};
export type returnCheckFuc = Omit<checkFileErrorType, "checkFuc">;
export type argumentCheckFuc = { file: File } & returnCheckFuc;

export const sliceFile = (type: string) => type.split("/")[1];

export const validateCheckFileType = ({
  file,
  msg,
  values,
}: argumentCheckFuc): returnCheckFuc | void => {
  const extensionFile = sliceFile(file.type);
  if (Array.isArray(values) && !values.includes(extensionFile)) {
    return { msg, values };
  }
};

export const validateCheckSize = ({
  file,
  msg,
  values,
}: argumentCheckFuc): returnCheckFuc | void => {
  const fileSize = parseFloat((file.size / 1024 / 1024).toFixed(2));
  if (typeof values === "number" && !(fileSize <= values)) {
    return { msg, values };
  }
};

export function validateWidthHeightImage({
  file,
  values,
  msg,
  isMax,
}: argumentCheckFuc): Promise<returnCheckFuc | void> {
  return new Promise<void | returnCheckFuc>((resolve) => {
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.src = src;

    img.onload = function () {
      const width = img.width;
      const height = img.height;

      URL.revokeObjectURL(src);
      if (Array.isArray(values)) {
        const wValue = parseFloat(values[0]);
        const hValue = parseFloat(values[1] || values[0]);
        const isCheck = isMax
          ? width < wValue && height < hValue
          : width > wValue && height > hValue;
        if (!isCheck) {
          resolve({ values, msg });
        }
        resolve();
      }
    };

    img.onerror = function () {
      resolve();
    };
  });
}

export function validateWidthHeightVideo({
  file,
  values,
  msg,
  isMax,
}: argumentCheckFuc): Promise<returnCheckFuc | void> {
  return new Promise<void | returnCheckFuc>((resolve) => {
    const img = new Image();
    const src = URL.createObjectURL(file);
    img.src = src;

    img.onload = function () {
      const width = img.width;
      const height = img.height;

      URL.revokeObjectURL(src);
      if (Array.isArray(values)) {
        const wValue = parseFloat(values[0]);
        const hValue = parseFloat(values[1] || values[0]);
        const isCheck = isMax
          ? width < wValue && height < hValue
          : width > wValue && height > hValue;
        if (!isCheck) {
          resolve({ values, msg });
        }
        resolve();
      }
    };

    img.onerror = function () {
      resolve();
    };
  });
}
