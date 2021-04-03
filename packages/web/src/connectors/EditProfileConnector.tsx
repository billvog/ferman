import { Spinner } from "@chakra-ui/spinner";
import { UpdateProfileController } from "@ferman-pkgs/controller";
import React from "react";
import { EditProfileView } from "../views/EditProfileView";

interface EditProfileConnectorProps {}
export const EditProfileConnector: React.FC<EditProfileConnectorProps> = ({}) => {
  return (
    <UpdateProfileController>
      {(props) =>
        !props.initialValues ? (
          <Spinner />
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
