import { UpdateProfileController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { EditProfileView } from "./EditProfileView";

interface EditProfileConnectorProps {}
export const EditProfileConnector: React.FC<EditProfileConnectorProps> = () => {
  const router = useRouter();
  const finished = () => {
    router.back();
  };

  const { me } = useContext(AuthContext);
  if (!me) return null;

  return (
    <UpdateProfileController onFinish={finished}>
      {(props) => (
        <EditProfileView
          initialValues={{
            username: me.username,
            bio: me.profile.bio,
            location: me.profile.location,
            showBirthdate: me.profile.showBirthdate,
          }}
          message={props.message}
          submit={props.submit}
        />
      )}
    </UpdateProfileController>
  );
};
