import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { AuthContext } from "../../auth/AuthProvider";
import { CreatePostModal } from "./CreatePostModal";

interface CreatePostGlobalModalProps {}
export const CreatePostGlobalModal: React.FC<CreatePostGlobalModalProps> =
  ({}) => {
    const router = useRouter();
    const screenType = useScreenType();

    const { me } = useContext(AuthContext);

    useEffect(() => {
      if (router.asPath === "/post" && !me) {
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
    }, [router.asPath, screenType, me]);

    return (
      <>
        {me && router.asPath === "/post" && router.pathname !== "/post" ? (
          <CreatePostModal isOpen={true} onClose={router.back} />
        ) : null}
      </>
    );
  };
