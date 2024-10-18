import { UserGroupsResponse, UserResponse } from "@/dtos/UserDtos";

import fetchExtended from "./fetchExtended";

export async function getUserGroups() {
  const res = await fetchExtended("user/groups");
  const json: UserGroupsResponse[] = await res.json();
  return json;
}

export async function getUser() {
  const res = await fetchExtended("/user");
  const json: UserResponse = await res.json();
  return json;
}
