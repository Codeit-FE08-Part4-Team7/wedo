import React from "react";

import Image from "next/image";
import Link from "next/link";

import NavigationMenuGroups from "@/layout/groups/NavigationMenuGroups";
import SheetGroups from "@/layout/groups/SheetGroups";
import Logo from "@/public/images/logo.png";

export default function GroupsResponsive() {
  return (
    <nav className="flex grow items-center gap-4 tab:gap-8 pc:gap-10">
      <div className="tab:hidden">
        <SheetGroups />
      </div>
      <Link href="/">
        <Image width={65} height={32} src={Logo} alt="로고" />
      </Link>
      <div className="lg-medium hidden items-center gap-4 tab:flex">
        <NavigationMenuGroups />
        <Link className="p-2 hover:bg-primary-light" href="/boards">
          자유게시판
        </Link>
      </div>
    </nav>
  );
}
