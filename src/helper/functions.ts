import { optionSelect } from "@/hooks/useSelect";
import { IPost } from "@/services/interface";
import {
  IListPost,
  currentConfigSildBarParams,
  slidebarConfigProps,
} from "@/types";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberMoneyVND = (num: string | number) => {
  let t = "0";
  if (num) {
    if (typeof num === "string") {
      num = Number(num);
    }
    t = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return t;
};

export const convertNumber = (value: number | string) => {
  let num = 0;
  if (value) {
    value = value.toString().replace(/[.]/g, "");
    value = value.trim();
    num = Number(value);
  }

  const regex = /^-?\d*$/;
  const check = regex.test(num.toString());
  return {
    value: num,
    check,
  };
};

export const checkNegative = (value: string) => {
  const regex = /^-[0-9]\d*(\\.\\d+)?$/;
  return regex.test(value.trim());
};

export function convertViToEn(str: string, toUpperCase = false) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str;
}

export const STT = (data?: any, index?: number) => {
  let stt = 1;
  let current_page = 0;
  let per_page = 0;

  if (data) {
    current_page = data.page;
    per_page = data.limit;
  }

  let i = (current_page - 1) * per_page;
  i = isNaN(i) ? 0 : i;
  stt = i + (index ?? 0) + 1;

  return stt;
};

export const joinUrl = (dir?: string, BASE_URL: string = "/", link = "/") => {
  const maxlength = BASE_URL.length;
  const str = BASE_URL.substring(maxlength - 1, maxlength);
  if (str !== link) {
    BASE_URL += link;
  }

  if (dir) {
    dir = dir.replace(/^[\/]{1,}/, "");
    return `${BASE_URL}${dir}`;
  } else {
    let url = BASE_URL;
    if (url && url?.length > 1) {
      url = url.replace(/[\/]{1,}$/, "");
    }
    return url;
  }
};

export const joinPathParent = (...arg: string[]) => {
  let str = "";
  if (arg && arg?.length > 0) {
    arg.forEach((item) => {
      str = joinUrl(item, str);
    });
  }
  return str;
};

export const formatDate = (
  date: string | Date,
  strFormat: string = "DD/MM/YYYY"
) => {
  return moment(date).format(strFormat);
};

export const sendFormData = (object: any) => {
  const dt = new FormData();
  for (const key in object) {
    if (Array.isArray(object[key])) {
      dt.append(`${key}`, JSON.stringify(object[key]));
    } else if ((object[key]?.[0] as File)?.name) {
      Array.from(object[key] as FileList).forEach((file) => {
        dt.append(key, file);
      });
    } else {
      dt.append(key, (object[key] as string) || "");
    }
  }

  return dt;
};

export const sliceString = (str: string, length = 15, h = "...") => {
  let newStr = str;

  if (str && typeof str === "string") {
    if (str.length > length) {
      newStr = newStr.slice(0, length);
      newStr += h;
    }
  }
  return newStr;
};

export const getValueSelected = (value?: any, options?: optionSelect[]) => {
  const currentValue = (options ?? [])?.filter((otp) =>
    Array.isArray(value) ? value?.includes(otp.value) : otp?.value === value
  );
  return currentValue;
};

export const findConfigSildeBar = <T extends slidebarConfigProps>({
  slidebarArray,
  newPathName,
}: currentConfigSildBarParams<T>): T | undefined => {
  return slidebarArray.find((item) => {
    const matchUrl = (newPathName ?? "").match(/^(.*?\/edit-[^\/]+)\/.*$/);
    const newUrl = matchUrl ? matchUrl?.[1] : newPathName;
    return item?.path === newUrl;
  });
};

export function deepClone<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Trả về đối tượng nguyên bản nếu là kiểu dữ liệu nguyên thủy hoặc null
  }
  let newObj: any;

  // Kiểm tra nếu đối tượng đầu vào là mảng hoặc đối tượng
  if (Array.isArray(obj)) {
    newObj = [];
    // Lặp qua từng phần tử trong mảng và sao chép nó
    for (let i = 0; i < obj.length; i++) {
      newObj[i] = deepClone(obj[i]);
    }
  } else {
    newObj = {};
    // Lặp qua từng thuộc tính của đối tượng và sao chép nó
    for (let key in obj) {
      // Đảm bảo thuộc tính đó thuộc sở hữu của đối tượng, không phải kế thừa từ prototype chain
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Đệ quy để sao chép giá trị của thuộc tính đó
        newObj[key] = deepClone(obj[key]);
      }
    }
  }
  return newObj;
}

export const slugUrl = (name: string, replacement: string = "-") => {
  return slugify(name, {
    lower: true,
    locale: "vi",
    replacement: replacement,
    strict: true,
    trim: true,
  });
};

export const customDataGroup = (dataPosts?: IPost[]) => {
  return (dataPosts ?? []).reduce((total, currentPost): IListPost => {
    if (currentPost?.group && currentPost?.category) {
      const idGroup = currentPost?.group?.id;
      const idCategory = currentPost?.category?.id;
      const current = {
        [idCategory]: {
          list: [currentPost],
          onePost: currentPost,
          category: currentPost?.category,
        },
      };

      if (Object.hasOwn(total, idGroup ?? "")) {
        if (Object.hasOwn(total?.[idGroup].posts, idCategory)) {
          total[idGroup].posts[idCategory].list.push(currentPost);
        } else {
          total[idGroup].posts = { ...total[idGroup].posts, ...current };
        }
      } else {
        total = {
          ...total,
          [idGroup]: {
            group: currentPost?.group,
            posts: current,
          },
        };
      }
    }
    return total;
  }, {} as IListPost);
};
