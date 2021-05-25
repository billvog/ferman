import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CreateCommentModal } from "./CreateCommentModal";
import { useScreenType } from "../../../../shared-hooks/useScreenType";
import { withMyApollo } from "../../../../utils/withMyApollo";

const CreateCommentMatchUrl =
  /^(\/post\/[0-9]+\/comment\/[0-9]+\/reply)|(\/post\/[0-9]+\/comment)$/;

interface CreateCommentGlobalModalProps {}
const CreateCommentGlobalModal: React.FC<CreateCommentGlobalModalProps> =
  ({}) => {
    const router = useRouter();
    const screenType = useScreenType();

    useEffect(() => {
      if (
        router.asPath.match(CreateCommentMatchUrl) &&
        screenType === "fullscreen"
      ) {
        router.replace(
          {
            pathname: `/post/[postId]/comment${
              router.query.commentId ? "/[commentId]/reply" : ""
            }`,
            query: {
              postId: router.query.postId,
              commentId: router.query.commentId,
            },
          },
          `/post/${router.query.postId}/comment${
            router.query.commentId ? `/${router.query.commentId}/reply` : ""
          }`,
          { shallow: true }
        );
      }
    }, [router.asPath, screenType]);

    return (
      <>
        {(router.pathname === "/post/[postId]" ||
          router.pathname === "/post/[postId]/comment/[commentId]") &&
        router.asPath.match(CreateCommentMatchUrl) ? (
          <CreateCommentModal isOpen={true} onClose={() => router.back()} />
        ) : null}
      </>
    );
  };

export default withMyApollo({ ssr: false })(CreateCommentGlobalModal);
