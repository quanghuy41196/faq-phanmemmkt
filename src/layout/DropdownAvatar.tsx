"use client";
import StaticImages from "@/assets/images";
import { cn } from "@/helper/functions";
import { useLogout } from "@/services/framework/auth/useLogout";
import { Avatar, Dropdown } from "flowbite-react";
import Image from "next/image";

const DropdownAvatar = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div>
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <Image
            className="cursor-pointer rounded-full border shadow-lg"
            src={StaticImages.defaultAvatar}
            width={40}
            height={40}
            alt="avatar"
          />
        )}
      >
        <Dropdown.Header>
          <Avatar img={StaticImages.defaultAvatar?.src} rounded>
            <div className="space-y-1 font-medium dark:text-white">
              <div>{"Quản trị viên"}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {"admin@phanmemkt.vn"}
              </div>
            </div>
          </Avatar>
        </Dropdown.Header>
        <Dropdown.Item
          className={cn("font-medium", isPending && "cursor-default")}
          onClick={() => {
            if (isPending) return;
            logout();
          }}
        >
          Đăng xuất
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default DropdownAvatar;
