import { useRouter } from "next/router";
import React from "react";
import { CreatePostModal } from "../modules/post/create/CreatePostModal";
import { useScreenType } from "../shared-hooks/useScreenType";

interface GlobalModalManagerProps {}

export const GlobalModalManager: React.FC<GlobalModalManagerProps> = ({}) => {
  const router = useRouter();
  const screenType = useScreenType();

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
