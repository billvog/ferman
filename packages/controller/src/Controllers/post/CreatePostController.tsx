import React, { useState } from "react";
import { ErrorMap } from "../../types/ErrorMap";
import {
  FullPostFragment,
  useCreatePostMutation,
  usePostQuery,
} from "../../generated/graphql";
import { MyMessage } from "../../types/MyMessage";

export interface CreatePostFormValues {
  body: string;
}

interface CreatePostControllerProps {
  parentPostId?: string;
  onFinish: (postId: string) => void;
  children: (data: {
    parentPost?: FullPostFragment;
    submit: (values: CreatePostFormValues) => Promise<{
      errors: ErrorMap | null;
    }>;
    message: MyMessage | null;
  }) => JSX.Element;
}

export const CreatePostController: React.FC<CreatePostControllerProps> = ({
  parentPostId = undefined,
  onFinish,
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [createPost] = useCreatePostMutation({
    update: (cache) => {
      cache.evict({ fieldName: "posts" });

      if (!!parentPostId) {
        cache.evict({ id: "Post:" + parentPostId });
      }
    },
  });

  const { data: parentData, loading: parentLoading } = usePostQuery({
    skip: parentPostId === undefined,
    variables: {
      id: parentPostId || "",
    },
  });

  const submit = async (values: CreatePostFormValues) => {
    const response = await createPost({
      variables: {
        parentPostId,
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
    parentPost: parentData?.post || undefined,
    submit,
    message,
  });
};
