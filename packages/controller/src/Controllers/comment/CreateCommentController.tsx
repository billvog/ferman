import React, { useState } from "react";
import { ErrorMap } from "../../types/ErrorMap";
import { MyMessage } from "../../types/MyMessage";
import { useCreateCommentMutation } from "../../generated/graphql";

export interface CreateCommentFormValues {
  text: string;
}

interface CreateCommentControllerProps {
  postId: string;
  reply: string | undefined;
  onFinish: (commentId: string) => any;
  children: (data: {
    submit: (values: CreateCommentFormValues) => Promise<{
      errors: ErrorMap | null;
    }>;
    message: MyMessage | null;
  }) => JSX.Element | null;
}

export const CreateCommentController: React.FC<CreateCommentControllerProps> =
  ({ postId, reply, onFinish, children }) => {
    const [message, setMessage] = useState<MyMessage | null>(null);
    const [commentPost] = useCreateCommentMutation();

    const submit = async (values: CreateCommentFormValues) => {
      const { data, errors } = await commentPost({
        variables: {
          id: postId,
          parentId: typeof reply === "string" ? reply : null,
          options: values,
        },
        update: (cache) => {
          cache.evict({ fieldName: "comments" });
          cache.evict({ fieldName: "comment" });
          cache.evict({ id: "Post:" + postId });
        },
      });

      if (!data || errors) {
        setMessage({
          type: "error",
          text: "errors.500",
        });
        return {
          errors: null,
        };
      }

      if (data?.createComment.error) {
        return {
          errors: {
            [data.createComment.error.field]: data.createComment.error.message,
          },
        };
      }

      if (data.createComment.comment?.id)
        onFinish(data.createComment.comment.id);

      return {
        errors: null,
      };
    };

    return children({
      submit,
      message,
    });
  };
