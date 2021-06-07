import { CreatePostController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { CreatePostView } from "./CreatePostView";

interface CreatePostConnectorProps {
  setModalTitle: (t: JSX.Element) => void;
  onFinish?: () => any;
}

export const CreatePostConnector: React.FC<CreatePostConnectorProps> = ({
  setModalTitle,
  onFinish,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const [parentPostId, setParentPostId] =
    useState<string | undefined>(undefined);

  const onControllerFinish = (postId: string) => {
    if (typeof onFinish === "function") onFinish();

    toast.info(
      <div>
        {t("post.alert.created.text")}.
        <span
          onClick={() => router.push(`/post/${postId}`)}
          className="block hover:underline font-bold"
        >
          {t("post.alert.created.view")}
        </span>
      </div>,
      {
        position: "bottom-center",
      }
    );
  };

  useEffect(() => {
    if (!!router.query.postId) {
      setParentPostId(router.query.postId as string);
    }
  }, [router.query.postId]);

  return (
    <CreatePostController
      parentPostId={parentPostId}
      onFinish={onControllerFinish}
    >
      {(props) => <CreatePostView setModalTitle={setModalTitle} {...props} />}
    </CreatePostController>
  );
};
