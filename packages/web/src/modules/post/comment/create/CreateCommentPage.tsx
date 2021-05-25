import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CommonBottomNav } from "../../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../../components/CommonSidebar";
import { MainGrid } from "../../../../components/MainGrid";
import { MyCenterSpinner } from "../../../../components/MyCenterSpinner";
import { WaitAuth } from "../../../../components/WaitAuth";
import { WaitI18 } from "../../../../components/WaitI18";
import { useScreenType } from "../../../../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../../utils/withMyApollo";
import { HeaderController } from "../../../display/HeaderController";
import { CreateCommentConnector } from "./CreateCommentConnector";

interface CreateCommentPageProps {}
export const Page: React.FC<CreateCommentPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const screenType = useScreenType();

  useEffect(() => {
    if (screenType !== "fullscreen" && router.query.postId) {
      router.replace(
        {
          pathname: `/post/[postId]${
            router.query.commentId ? `/comment/[commentId]` : ""
          }`,
          query: {
            postId: router.query.postId,
            commentId: router.query.commentId,
          },
        },
        `/post/${router.query.postId}/comment${
          router.query.commentId ? `/${router.query.commentId}/reply` : ""
        }`,
        {
          shallow: true,
        }
      );
    }
  }, [screenType, router.query]);

  return (
    <WaitI18>
      <HeaderController
        title={t(router.query.reply ? "comment.reply" : "comment.comment")}
      />
      <WaitAuth>
        {(user) =>
          screenType === "fullscreen" && router.query.postId ? (
            <MainGrid
              title={t(
                router.query.reply ? "comment.reply" : "comment.comment"
              )}
              loggedUser={user}
              bottomNav={<CommonBottomNav loggedUser={user} />}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <div className="px-3">
                <CreateCommentConnector />
              </div>
            </MainGrid>
          ) : (
            <MyCenterSpinner />
          )
        }
      </WaitAuth>
    </WaitI18>
  );
};

export const CreateCommentPage = withMyApollo()(Page);
