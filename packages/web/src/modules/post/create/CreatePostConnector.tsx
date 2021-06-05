import { CreatePostController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { CreatePostView } from "./CreatePostView";

interface CreatePostConnectorProps {
  onFinish: () => any;
}

export const CreatePostConnector: React.FC<CreatePostConnectorProps> = ({
  onFinish,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const onControllerFinish = (postId: string) => {
    onFinish();
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

  return (
    <CreatePostController onFinish={onControllerFinish}>
      {(props) => <CreatePostView {...props} />}
    </CreatePostController>
  );
};
