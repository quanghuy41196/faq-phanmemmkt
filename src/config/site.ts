import { listNavHeaderParmas } from "@/types";

export const site = {
  name: "Phần mềm MKT",
  copyright: `© Copyright 2013 by phần mềm MKT – Website đang chờ đăng ký với bộ
          công thương, nghiêm cấm sao chép dưới mọi hình thức. Mọi hành vi sao
          chép sẽ chịu hoàn toàn trách nhiệm`,
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
