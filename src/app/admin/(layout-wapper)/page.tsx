import { routerPath } from "@/config";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(routerPath.post)
}
