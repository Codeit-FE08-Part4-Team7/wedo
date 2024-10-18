"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { postSignIn } from "./auth";

export async function actionSignIn(formData: FormData) {
  const cookieStore = cookies();
  let shouldRedirect = false;
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await postSignIn({ email, password });
    cookieStore.set("accessToken", res.accessToken);
    cookieStore.set("refreshToken", res.refreshToken);
    shouldRedirect = true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
  if (shouldRedirect) {
    redirect("/");
  }
}
