import { FullUserFragment } from "@ferman-pkgs/controller";

export interface PageWithAuthProps {
  loggedUser: FullUserFragment | null | undefined;
}
