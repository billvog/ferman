import React, { useState } from "react";
import { ErrorMap } from "../../types/ErrorMap";
import { MyMessage } from "../../types/MyMessage";
import { useCreateChatMutation } from "../../generated/graphql";

export interface CreateChatFormValues {
  reciever_uid: string;
}

interface CreateChatControllerProps {
  onFinish: () => any;
  children: (data: {
    submit: (values: CreateChatFormValues) => Promise<{
      chatId?: string;
      errors: ErrorMap | null;
    }>;
    message: MyMessage | null;
  }) => JSX.Element | null;
}

export const CreateChatController: React.FC<CreateChatControllerProps> = ({
  onFinish,
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [createChat] = useCreateChatMutation();

  const submit = async (values: CreateChatFormValues) => {
    const { data, errors } = await createChat({
      variables: {
        reciever_uid: values.reciever_uid,
      },
      update: (cache) => {
        cache.evict({ fieldName: "Chats" });
      },
    });

    if (!data || errors) {
      setMessage({
        type: "error",
        text: "Internal server error",
      });
      return {
        errors: null,
      };
    }

    if (data?.createChat.error) {
      return {
        errors: {
          [data.createChat.error.field]: data.createChat.error.message,
        },
      };
    }

    onFinish();
    return {
      chatId: data.createChat.chat?.id,
      errors: null,
    };
  };

  return children({
    submit,
    message,
  });
};
