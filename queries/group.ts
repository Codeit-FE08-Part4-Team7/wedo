import { useMutation } from "@tanstack/react-query";

import { acceptInvitation, addTeam } from "@/apis/group";

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation(token),
  });
}

export function useAddTeam() {
  return useMutation({
    mutationFn: ({ image, name }: { image: File; name: string }) =>
      addTeam({ image, name }),
  });
}
