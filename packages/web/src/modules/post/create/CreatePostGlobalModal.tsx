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
      router.replace("/post", "/post", { shallow: true });
    }
  }, [router.asPath, screenType]);

  return (
    <>
      {router.asPath === "/post" && router.pathname !== "/post" ? (
        <CreatePostModal
          isOpen={true}
          onClose={() =>
            router.replace(
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

export default withMyApollo({ ssr: false })(CreatePostGlobalModal);
