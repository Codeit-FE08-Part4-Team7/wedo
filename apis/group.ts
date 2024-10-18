import { AcceptInvitationResponse, AddTeamResponse } from "@/dtos/GroupDtos";

import fetchExtended from "./fetchExtended";
import { uploadImage } from "./image";
import { getUser } from "./user";

export async function acceptInvitation(
  token: string,
): Promise<AcceptInvitationResponse> {
  const user = await getUser();

  const res = await fetchExtended("/groups/accept-invitation", {
    method: "POST",
    body: JSON.stringify({ userEmail: user.email, token }),
  });
  const json = await res.json();

  if (!res.ok) {
    // status: 400 / message : "이미 그룹에 소속된 유저입니다." (이미 팀에 있는 email)
    // status: 400 / message : "유효하지 않은 초대입니다." (초대 토큰 이상함)
    // status: 401 / message : "jwt expired" (초대 토큰 만료)
    // status: 404 / message : "유저가 존재하지 않습니다." (email 잘못된 경우)
    throw new Error(json.message);
  }

  return json;
}

export async function addTeam({
  image,
  name,
}: {
  image: File;
  name: string;
}): Promise<AddTeamResponse> {
  const { url: imageUrl } = await uploadImage(image);

  const res = await fetchExtended("/groups", {
    method: "POST",
    body: JSON.stringify({ image: imageUrl, name }),
  });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
