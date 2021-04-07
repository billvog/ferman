import React, { useState } from "react";
import { ErrorMap } from "../Types/ErrorMap";
import { MyMessage } from "../Types/MyMessage";
import { useCommentPostMutation } from "../generated/graphql";

export interface CommentFormValues {
  text: string;
}

interface CommentControllerProps {
  postId: string;
  reply: string | undefined;
  onFinish: () => any;
  children: (data: {
    submit: (values: CommentFormValues) => Promise<ErrorMap | null>;
    message: MyMessage | null;
  }) => JSX.Element | null;
}

export const CommentController: React.FC<CommentControllerProps> = ({
  postId,
  reply,
  onFinish,
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [commentPost] = useCommentPostMutation();

  const submit = async (values: CommentFormValues) => {
    const { data, errors } = await commentPost({
      variables: {
        id: postId,
        parentId: typeof reply === "string" ? reply : null,
        options: values,
      },
      update: (cache) => {
        cache.evict({ fieldName: "comments" });
        cache.evict({ fieldName: "viewComment" });
        cache.evict({ id: "Post:" + postId });
      },
    });

    if (!data || errors) {
      setMessage({
        type: "error",
        text: "Internal server error",
      });
      return null;
    }

    if (data?.createComment.error) {
      return {
        [data.createComment.error.field]: data.createComment.error.message,
      };
    }

    onFinish();
    return null;
  };

  return children({
    submit,
    message,
  });
};
