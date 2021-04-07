import { UpdateProfileController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { MySpinner } from "../components/MySpinner";
import { toast } from "react-toastify";
import { EditProfileView } from "../views/EditProfileView";

interface EditProfileConnectorProps {}
export const EditProfileConnector: React.FC<EditProfileConnectorProps> = ({}) => {
  const router = useRouter();

  const finished = () => {
    toast.success("Profile updated");
    router.back();
  };

  return (
    <UpdateProfileController onFinish={finished}>
      {(props) =>
        !props.initialValues ? (
          <MySpinner />
        ) : (
          <EditProfileView
            myInitialValues={props.initialValues}
            message={props.message}
            submit={props.submit}
          />
        )
      }
    </UpdateProfileController>
  );
};
