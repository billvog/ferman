import React, { useState } from "react";
import { ErrorMap } from "../../types/ErrorMap";
import { useCreatePostMutation } from "../../generated/graphql";
import { MyMessage } from "../../types/MyMessage";

export interface CreatePostFormValues {
  body: string;
}

interface CreatePostControllerProps {
  onFinish: (postId: string) => void;
  children: (data: {
    submit: (values: CreatePostFormValues) => Promise<{
      errors: ErrorMap | null;
    }>;
    message: MyMessage | null;
  }) => JSX.Element;
}

export const CreatePostController: React.FC<CreatePostControllerProps> = ({
  onFinish,
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [createPost] = useCreatePostMutation({
    update: (cache) => {
      cache.evict({ fieldName: "posts" });
    },
  });

  const submit = async (values: CreatePostFormValues) => {
    const response = await createPost({
      variables: {
        options: values,
      },
    });

    if (response.errors) {
      setMessage({
        type: "error",
        text: "errors.500",
      });
      return {
        errors: null,
      };
    }

    if (response.data?.createPost.error) {
      return {
        errors: {
          [response.data.createPost.error.field]:
            response.data.createPost.error.message,
        },
      };
    }

    if (response.data?.createPost.post?.id)
      onFinish(response.data.createPost.post.id);

    return {
      errors: null,
    };
  };

  return children({
    submit,
    message,
  });
};
