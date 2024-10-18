"use server";

import { cookies } from "next/headers";

export async function getServerCookie(key: string) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key);
  return cookie?.value;
}

export async function setServerCookie<T extends string>(key: string, value: T) {
  const cookieStore = cookies();
  cookieStore.set(key, value);
}
