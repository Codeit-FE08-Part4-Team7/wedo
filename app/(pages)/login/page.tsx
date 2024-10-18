import Link from "next/link";

import { actionSignIn } from "@/apis/action";

export const GOOGLE_OAUTH_PARAMS = {
  client_id: process.env.GOOGLE_CLIENT_ID!,
  redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
  response_type: "code",
  scope: "openid profile email",
};

export const KAKAO_OAUTH_PARAMS = {
  client_id: process.env.KAKAO_CLIENT_ID!,
  redirect_uri: process.env.KAKAO_REDIRECT_URI!,
  response_type: "code",
  scope: "openid,profile_image,profile_nickname",
};

export default function LoginPage() {
  const google = new URLSearchParams(GOOGLE_OAUTH_PARAMS);
  const kakao = new URLSearchParams(KAKAO_OAUTH_PARAMS);

  return (
    <div>
      <form action={actionSignIn}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" defaultValue="" />
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="text" defaultValue="" />
        <button type="submit">로그인</button>
      </form>
      <Link
        className="w-30 h-10 bg-gray-500"
        href={`https://accounts.google.com/o/oauth2/v2/auth?${google}`}
      >
        구글 로그인
      </Link>
      <Link
        className="w-30 h-10 bg-gray-500"
        href={`https://kauth.kakao.com/oauth/authorize?${kakao}`}
      >
        카카오 로그인
      </Link>
    </div>
  );
}
