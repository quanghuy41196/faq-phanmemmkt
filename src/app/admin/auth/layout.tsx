import LayoutDefaultAuth from "@/layout/LayoutDefaultAuth";
import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <LayoutDefaultAuth>{children}</LayoutDefaultAuth>;
}
