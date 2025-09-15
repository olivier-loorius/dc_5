import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAuthenticated = Boolean(cookies().get("auth")?.value);
  if (!isAuthenticated) {
    redirect("/");
  }
  return children;
}
