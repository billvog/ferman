import React, { useState } from "react";
import { useUpdateProfileMutation } from "../../../generated/graphql";
import { ErrorMap } from "../../../types/ErrorMap";
import { MyMessage } from "../../../types/MyMessage";

export interface UpdateProfileFormValues {
  username: string;
  bio: string;
  location: string;
  showBirthdate: boolean;
}

interface UpdateProfileControllerProps {
  onFinish: () => any;
  children: (data: {
    submit: (values: UpdateProfileFormValues) => Promise<ErrorMap | null>;
    message: MyMessage | null;
  }) => JSX.Element | null;
}

export const UpdateProfileController: React.FC<UpdateProfileControllerProps> =
  ({ children, onFinish }) => {
    const [message, setMessage] = useState<MyMessage | null>(null);
    const [updateProfile] = useUpdateProfileMutation();

    const submit = async (values: UpdateProfileFormValues) => {
      const { data } = await updateProfile({
        variables: {
          options: values,
        },
      });

      if (!data) {
        setMessage({
          type: "error",
          text: "errors.500",
        });
        return null;
      }

      if (data?.updateProfile.error) {
        return {
          [data.updateProfile.error.field]: data.updateProfile.error.message,
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
