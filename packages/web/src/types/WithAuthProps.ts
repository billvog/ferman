import { FullUserFragment } from "@ferman-pkgs/controller";

export interface WithAuthProps {
  loggedUser: FullUserFragment | null | undefined;
}
