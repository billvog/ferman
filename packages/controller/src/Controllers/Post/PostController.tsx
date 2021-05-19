import React, { useState } from "react";
import { ErrorMap } from "../../types/ErrorMap";
import { useCreatePostMutation } from "../../generated/graphql";
import { MyMessage } from "../../types/MyMessage";

export interface PostFormValues {
  body: string;
}

interface PostControllerProps {
  children: (data: {
    submit: (
      values: PostFormValues
    ) => Promise<{
      postId?: string;
      errors: ErrorMap | null;
    }>;
    message: MyMessage | null;
  }) => JSX.Element;
}

export const PostController: React.FC<PostControllerProps> = ({ children }) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [createPost] = useCreatePostMutation({
    update: (cache) => {
      cache.evict({ fieldName: "posts" });
    },
  });

  const submit = async (values: PostFormValues) => {
    const response = await createPost({
      variables: {
        options: values,
      },
    });

    if (response.errors) {
      setMessage({
        type: "error",
        text: "Internal server error",
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

    return {
      postId: response.data?.createPost.post?.id,
      errors: null,
    };
  };

  return children({
    submit,
    message,
  });
};
