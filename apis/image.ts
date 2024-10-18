import { getSession } from "next-auth/react";

import { ImageUploadResponse } from "@/dtos/ImageDtos";

import { auth } from "@/auth";

// fetchExtended에 기본적으로 application/json으로 content-type이 정해져 있어서
// formdata를 사용하는 경우 multipart/form-data로 정하더라도 boundary 값이 할당되지 않아서 에러가 발생 (status: 500)
// 그래서 fetchExtended를 사용하지 않고 코드 작성 -> 이후에 fetchExtended가 수정된다면 사용 가능
export async function uploadImage(
  imageFile: File,
): Promise<ImageUploadResponse> {
  const { size } = imageFile;

  if (size / (1024 * 1024) >= 10) {
    throw new Error("이미지 파일의 용량이 10MB를 넘을 수 없습니다.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  let session;
  if (typeof window !== "undefined") {
    session = await getSession();
  } else {
    session = await auth();
  }
  const accessToken = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/8-7/images/upload`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
