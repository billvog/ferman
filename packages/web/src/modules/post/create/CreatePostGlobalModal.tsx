import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CreatePostModal } from "./CreatePostModal";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { withMyApollo } from "../../../utils/withMyApollo";

interface CreatePostGlobalModalProps {}
const CreatePostGlobalModal: React.FC<CreatePostGlobalModalProps> = ({}) => {
  const router = useRouter();
  const screenType = useScreenType();

  useEffect(() => {
    if (router.asPath === "/post" && screenType === "fullscreen") {
      router.push("/post", "/post", { shallow: true });
    }
  }, [router.asPath, screenType]);

  return (
    <>
      {/* Create Post Modal */}
      {router.asPath === "/post" && router.pathname !== "/post" ? (
        <CreatePostModal
          isOpen={true}
          onClose={() =>
            router.push(
              {
                pathname: router.pathname,
                query: router.query,
              },
              undefined,
              { shallow: true }
            )
          }
        />
      ) : null}
    </>
  );
};

export default withMyApollo()(CreatePostGlobalModal);
