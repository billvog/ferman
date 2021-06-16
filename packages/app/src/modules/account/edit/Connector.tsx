import { UpdateProfileController } from "@ferman-pkgs/controller";
import React, { useContext } from "react";
import { HomeNavProps } from "../../../navigation/AppTabs/Stacks/Home/ParamList";
import { AuthContext } from "../../auth/AuthProvider";
import { EditProfileView } from "./View";

export const EditProfileConnector: React.FC<any> = ({
  navigation,
}: HomeNavProps<"EditProfile">) => {
  const { me } = useContext(AuthContext);

  const finished = () => {
    navigation.goBack();
  };

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
          {...props}
        />
      )}
    </UpdateProfileController>
  );
};
