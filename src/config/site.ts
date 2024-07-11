import { listNavHeaderParmas } from "@/types";

export const site = {
  name: "Phần mềm MKT",
};

export const headersFormData = {
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
  },
};

export const listNavHeader: listNavHeaderParmas[] = [
  {
    text: "Sản phẩm",
    href: "https://phanmemmkt.vn/san-pham",
    isBlank: true,
  },

  {
    text: "Hướng dẫn",
    href: "https://phanmemmkt.vn/huong-dan-chung",
    isBlank: true,
  },

  {
    text: "Bảng giá",
    href: "https://phanmemmkt.vn/bang-gia-phan-mem-mkt",
    isBlank: true,
  },

  {
    text: "Tải phần mềm",
    href: "https://phanmemmkt.vn/tai-phan-mem-mkt-2",
    isBlank: true,
  },
];
