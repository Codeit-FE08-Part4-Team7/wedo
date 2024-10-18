import { cookies } from "next/headers";

import AuthHeader from "./AuthHeader";
import UnAuthHeader from "./UnAuthHeader";

export default async function HeaderLayout() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return (
    <header className="sticky w-full bg-brand-header">
      <div className="lg-medium relative mx-auto flex h-[60px] max-w-[1440px] items-center px-4 tab:px-6">
        {accessToken ? <AuthHeader /> : <UnAuthHeader />}
      </div>
    </header>
  );
}
