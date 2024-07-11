import { ConfigListMXHType, configFooterType } from "@/types";
import { Fragment } from "react";
import { BsFillBuildingFill } from "react-icons/bs";
import {
  FaInternetExplorer,
  FaTelegram,
  FaTiktok,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { routerPath } from "./router";

const ListMXH: ConfigListMXHType[] = [
  {
    Icon: FaUsers,
    link: "https://www.facebook.com/groups/807240710504127/",
    color: "#69727d",
  },

  {
    Icon: FaTelegram,
    link: "https://t.me/+9EuCubBZNCJhYmE1",
    color: "#2ca5e0",
  },

  {
    Icon: FaYoutube,
    link: "https://www.youtube.com/channel/UCzT9f4tX-o4oQpVbHTdm_sA",
    color: "#cd201f",
  },

  {
    Icon: FaTiktok,
    link: "http://www.tiktok.com/@mokate.mkt",
    color: "#69727d",
  },
];

export const LinkTypeFooter: configFooterType[] = [
  {
    head: "CÔNG TY CP GIẢI PHÁP MKT",
    children: [
      {
        Icon: BsFillBuildingFill,
        name: "Tầng 4 Toà Nhà Stellar Garden, 35 Lê Văn Thiêm, Thanh Xuân, HN",
        link: "https://www.google.com/maps/place/Stellar+Garden/@21.000621,105.8013367,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ad10940ff6fb:0x2390fdb10dee9dc6!8m2!3d21.000616!4d105.8035254",
      },

      {
        Icon: HiPhone,
        name: "tel:+84966363373",
        link: "mailto:phanmemmkt.vn@gmail.com",
      },

      {
        Icon: MdEmail,
        name: "phanmemmkt.vn@gmail.com",
        link: "mailto:phanmemmkt.vn@gmail.com",
      },

      {
        Icon: FaInternetExplorer,
        name: "Website: phanmemmkt.vn",
        link: "https://phanmemmkt.vn",
      },
    ],
  },

  {
    head: "ĐIỀU KHOẢN CHÍNH SÁCH",
    children: [
      {
        isArrow: true,
        name: "Điều Khoản Sử Dụng",
        link: "https://phanmemmkt.vn/dieu-khoan-su-dung/",
      },

      {
        isArrow: true,
        name: "Chính Sách Bảo Mật",
        link: "https://phanmemmkt.vn/chinh-sach-bao-mat/",
      },

      {
        isArrow: true,
        name: "Chính Sách Bảo Hành",
        link: "https://phanmemmkt.vn/chinh-sach-bao-hanh/",
      },

      {
        isArrow: true,
        name: "Chính Sách Cài Đặt Phần Mềm",
        link: "https://phanmemmkt.vn/chinh-sach-cai-dat-phan-mem/",
      },

      {
        isArrow: true,
        name: "Hướng Dẫn Thanh Toán",
        link: "https://phanmemmkt.vn/huong-dan-thanh-toan-phan-mem-mkt",
      },

      {
        isArrow: true,
        name: "Câu Hỏi Thường Gặp",
        link: "https://phanmemmkt.vn/huong-dan-thanh-toan-phan-mem-mkt",
      },
    ],
  },

  {
    head: "Bạn nên đọc",
    children: [
      {
        isArrow: true,
        name: "Giới Thiệu",
        link: "https://phanmemmkt.vn/gioi-thieu/",
      },

      {
        isArrow: true,
        name: "Hoạt động đào tạo",
        link: "https://phanmemmkt.vn/dao-tao",
      },

      {
        isArrow: true,
        name: "Tin Tức & Sự Kiện",
        link: "https://phanmemmkt.vn/chuyen-muc/tin-bao-chi",
      },

      {
        isArrow: true,
        name: "Tuyển Dụng",
        link: "https://phanmemmkt.vn/tuyen-dung",
      },

      {
        isArrow: true,
        name: "Liên Hệ",
        link: "https://phanmemmkt.vn/lien-he/",
      },
    ],
    lastReactElement: () => {
      return (
        <div className="mt-[17px]">
          <h3 className="font-semibold text-sm text-white">
            Kết nối với chúng tôi
          </h3>

          <div className="flex gap-3 mt-2">
            {ListMXH?.map((item, index) => {
              const Icon = item?.Icon ?? Fragment;

              return (
                <div
                  key={index}
                  className="rounded-full overflow-hidden"
                  style={{ backgroundColor: item?.color ?? "#69727d" }}
                >
                  <a
                    className="w-8 h-8 flex justify-center items-center rounded-full text-white"
                    style={{ fontSize: 16, lineHeight: "16px" }}
                    href={item?.link || routerPath.home}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
  },

  {
    head: "Cộng đồng",
    lastReactElement: () => {
      return (
        <iframe
          name="fd1d6468386501d17"
          width="100%"
          height="100%"
          data-testid="fb:page Facebook Social Plugin"
          title="fb:page Facebook Social Plugin"
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          allow="encrypted-media"
          src="https://www.facebook.com/v15.0/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dfb840fcb08a972a5a%26domain%3Dhuongdan.phanmemmkt.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fhuongdan.phanmemmkt.vn%252Ff82bf619a7204d3f8%26relation%3Dparent.parent&amp;container_width=260&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fphanmemmkt.vn%2F&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;tabs=&amp;width="
          style={{
            border: "none",
            visibility: "visible",
            width: "260px",
            height: "130px",
          }}
        ></iframe>
      );
    },
  },
];
