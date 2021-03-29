import React, { useState } from "react";
import { ErrorMap } from "../Types/ErrorMap";
import { useCreatePostMutation } from "../generated/graphql";
import { MyMessage } from "../Types/MyMessage";

export interface PostFormValues {
  title: string;
  body: string;
}

interface PostControllerProps {
  children: (data: {
    submit: (values: PostFormValues) => Promise<ErrorMap | null>;
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
      return null;
    }

    if (response.data?.createPost.error) {
      return {
        [response.data.createPost.error.field]:
          response.data.createPost.error.message,
      };
    }

    return null;
  };

  return children({
    submit,
    message,
  });
};
