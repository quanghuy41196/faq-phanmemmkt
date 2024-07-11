import StaticImages from "@/assets/images";
import Image from "next/image";
import { FC, ReactNode } from "react";

interface LayoutAuthProps {
  children?: ReactNode;
}

const LayoutDefaultAuth: FC<LayoutAuthProps> = ({ children }) => {
  return (
    <div className="main-section relative text-sm antialiased bg-[#023071]">
      <div className="min-h-screen text-black dark:text-white-dark">
        <div
          className={`flex min-h-screen items-center lg:justify-start bg-cover bg-center justify-center lg:pl-56`}
          style={{
            backgroundImage: `url(${StaticImages.bgLogin.src})`,
          }}
        >
          <div className="m-6 w-full max-w-lg sm:w-[450px] bg-white py-4 rounded-xl shadow-lg shadow-slate-500 px-5">
            <Image
              alt="logo"
              src={StaticImages.Logo}
              width={250}
              height={50}
              className="m-auto"
              priority
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDefaultAuth;
