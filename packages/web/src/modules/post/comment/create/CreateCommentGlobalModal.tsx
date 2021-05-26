import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CreateCommentModal } from "./CreateCommentModal";
import { useScreenType } from "../../../../shared-hooks/useScreenType";
import { WithAuthProps } from "../../../../types/WithAuthProps";

const CreateCommentMatchUrl =
  /^(\/post\/[0-9]+\/comment\/[0-9]+\/reply)|(\/post\/[0-9]+\/comment)$/;

interface CreateCommentGlobalModalProps extends WithAuthProps {}
export const CreateCommentGlobalModal: React.FC<CreateCommentGlobalModalProps> =
  ({ loggedUser }) => {
    const router = useRouter();
    const screenType = useScreenType();

    useEffect(() => {
      if (router.asPath.match(CreateCommentMatchUrl) && !loggedUser) {
        router.replace(
          {
            pathname: `/post/[postId]${
              router.query.commentId ? "/comment/[commentId]" : ""
            }`,
            query: {
              postId: router.query.postId,
              commentId: router.query.commentId,
            },
          },
          `/post/${router.query.postId}${
            router.query.commentId ? `/comment/${router.query.commentId}` : ""
          }`,
          { shallow: true }
        );
      } else if (
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
    }, [router.asPath, screenType, loggedUser]);

    return (
      <>
        {loggedUser &&
        router.pathname !== "/post/[postId]/comment" &&
        router.pathname !== "/post/[postId]/comment/[commentId]/reply" &&
        router.asPath.match(CreateCommentMatchUrl) ? (
          <CreateCommentModal isOpen={true} onClose={() => router.back()} />
        ) : null}
      </>
    );
  };
