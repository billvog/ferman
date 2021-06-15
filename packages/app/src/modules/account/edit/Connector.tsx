import { UpdateProfileController } from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { EditProfileView } from "./View";

interface EditProfileConnectorProps {}
export const EditProfileConnector: React.FC<EditProfileConnectorProps> = () => {
  const navigation = useNavigation();
  const finished = () => {
    navigation.goBack();
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
          {...props}
        />
      )}
    </UpdateProfileController>
  );
};
