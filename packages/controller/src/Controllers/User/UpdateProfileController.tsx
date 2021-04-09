import React, { useState } from "react";
import { MyMessage } from "../../Types/MyMessage";
import { useMeQuery, useUpdateProfileMutation } from "../../generated/graphql";
import { ErrorMap } from "../../Types/ErrorMap";

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
    initialValues: (UpdateProfileFormValues & { birthdate: string }) | null;
    message: MyMessage | null;
  }) => JSX.Element | null;
}

export const UpdateProfileController: React.FC<UpdateProfileControllerProps> = ({
  children,
  onFinish,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [updateProfile] = useUpdateProfileMutation();
  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  const submit = async (values: UpdateProfileFormValues) => {
    const { data } = await updateProfile({
      variables: {
        options: values,
      },
    });

    if (!data) {
      setMessage({
        type: "error",
        text: "Internal server error (500)",
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
    initialValues:
      meLoading || !meData || !meData.me
        ? null
        : {
            username: meData.me.username,
            ...meData.me.profile!,
          },
  });
};
