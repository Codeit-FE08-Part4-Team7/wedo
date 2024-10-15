"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/@common/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/@common/modal/NavigationMenu";
import { useUserGroups } from "@/hooks/querys/user";
import { cn } from "@/lib/utils";

// Navigation Menu의 외곽선이 지워지지 않음 (border-0, shadow-none을 적용했을 때 무반응)
export default function NavigationMenuGroups() {
  const { data: groups } = useUserGroups();
  const { teamid: teamId } = useParams();

  return (
    <NavigationMenu
      className={cn("h-[32px]", Number.isNaN(Number(teamId)) && "hidden")}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            <span className="lg-medium">
              {groups?.filter(({ id }) => id === Number(teamId))[0]?.name ??
                "temp"}
            </span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col gap-2 bg-primary-light p-4">
            {groups?.length &&
              groups.map(({ id, name, image }) => (
                <Link
                  key={`${name + id}notMobile`}
                  href={`/${id}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "2xl-medium m-0 flex h-full w-[186px] justify-start gap-3 bg-transparent p-2 hover:bg-brand-secondary-light",
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
                  </NavigationMenuLink>
                </Link>
              ))}
            <Link href="/addteam">
              <Button
                variant="outlinedSecondary"
                className="mt-3 w-full border-0 text-[#222222] shadow-[rgb(0,0,0,0.1)_0px_3px_10px_1px]"
              >
                팀 추가하기
              </Button>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport className="border-0 bg-primary-light" />
    </NavigationMenu>
  );
}
