import Image from "next/image";

import Logo from "@/public/images/logo.png";

import { auth } from "@/auth";

import AuthHeader from "./AuthHeader";

export default async function HeaderLayout() {
  const session = await auth();

  return (
    <header className="fixed w-full bg-brand-header">
      <div className="lg-medium relative mx-auto flex h-[60px] max-w-[1440px] items-center px-4 tab:px-6">
        {session?.accessToken ? (
          <AuthHeader />
        ) : (
          <Image width={65} height={32} src={Logo} alt="로고" />
        )}
      </div>
    </header>
  );
}
