"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/@common/Button";
import { useUserGroups } from "@/hooks/querys/user";
import { cn } from "@/lib/utils";
import Burger from "@/public/svg/burger";
import { navigationMenuTriggerStyle } from "@/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

export default function SheetGroups() {
  const { data: groups } = useUserGroups();
  const { teamid: teamId } = useParams();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Burger className="p-2 hover:bg-primary-light" color="gray" />
      </SheetTrigger>
      <SheetContent side="left" className="w-1/2 px-2">
        <SheetHeader className="pl-4">
          <SheetTitle>그룹 목록</SheetTitle>
        </SheetHeader>
        <ul className="mt-10 flex flex-col gap-3">
          {groups?.length &&
            groups.map(({ id, name, image }) => (
              <Link
                key={`${name + id}mobile`}
                href={`/${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "2xl-medium m-0 flex h-full w-full justify-start gap-3 p-2 hover:bg-brand-secondary-light",
                  id === Number(teamId) && "bg-brand-header",
                )}
              >
                <Image
                  className="rounded-md"
                  width={32}
                  height={32}
                  src={image ?? ""}
                  alt="그룹 이미지"
                />
                <span className="lg-medium">{name}</span>
              </Link>
            ))}
          <Link
            href="/boards"
            onClick={() => setOpen(false)}
            className={cn(
              navigationMenuTriggerStyle(),
              "2xl-medium m-0 flex h-full w-full justify-start gap-3 p-2 hover:bg-brand-secondary-light",
              teamId.includes("boards") && "bg-brand-header",
            )}
          >
            <div className="h-8 w-8" />
            <span className="lg-medium">자유게시판</span>
          </Link>
          <Link href="/addteam">
            <Button
              variant="default"
              className="mt-3 w-full border-0 text-[#222222] shadow-[rgb(0,0,0,0.1)_0px_3px_10px_1px]"
            >
              팀 추가하기
            </Button>
          </Link>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
