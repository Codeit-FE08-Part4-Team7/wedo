import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/@common/Button";
import Logo from "@/public/images/logo.png";

export default function UnAuthHeader() {
  return (
    <>
      <Image width={65} height={32} src={Logo} alt="로고" />
      <Link className="flex grow justify-end" href="/login">
        <Button className="bg-transparent">로그인</Button>
      </Link>
    </>
  );
}
