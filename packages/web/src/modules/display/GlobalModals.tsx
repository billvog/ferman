import React from "react";
import { MyCenterSpinner } from "../../components/MyCenterSpinner";
import { WaitAuth } from "../../components/WaitAuth";
import { WaitI18 } from "../../components/WaitI18";
import { withMyApollo } from "../../utils/withMyApollo";
import { CreateCommentGlobalModal } from "../post/comment/create/CreateCommentGlobalModal";
import { CreatePostGlobalModal } from "../post/create/CreatePostGlobalModal";

interface GlobalModalsProps {}
const C: React.FC<GlobalModalsProps> = ({}) => {
  return (
    <WaitI18>
      <WaitAuth>
        {(user) =>
          typeof user === "undefined" ? (
            <MyCenterSpinner />
          ) : (
            <>
              <CreatePostGlobalModal loggedUser={user} />
              <CreateCommentGlobalModal loggedUser={user} />
            </>
          )
        }
      </WaitAuth>
    </WaitI18>
  );
};

export const GlobalModals = withMyApollo()(C);
