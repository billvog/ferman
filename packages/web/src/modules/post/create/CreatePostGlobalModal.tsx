import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CreatePostModal } from "./CreatePostModal";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { WithAuthProps } from "../../../types/WithAuthProps";

interface CreatePostGlobalModalProps extends WithAuthProps {}
export const CreatePostGlobalModal: React.FC<CreatePostGlobalModalProps> = ({
  loggedUser,
}) => {
  const router = useRouter();
  const screenType = useScreenType();

  useEffect(() => {
    if (router.asPath === "/post" && !loggedUser) {
      router.replace("/", undefined, { shallow: true });
    } else if (router.asPath === "/post" && screenType === "fullscreen") {
      router.replace(
        {
          pathname: "/post",
          query: router.query,
        },
        "/post",
        { shallow: true }
      );
    }
  }, [router.asPath, screenType, loggedUser]);

  return (
    <>
      {loggedUser &&
      router.asPath === "/post" &&
      router.pathname !== "/post" ? (
        <CreatePostModal isOpen={true} onClose={router.back} />
      ) : null}
    </>
  );
};
