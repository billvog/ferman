import { useMeQuery } from "@ferman-pkgs/controller";
import React from "react";
import { MyCenterSpinner } from "../../components/MyCenterSpinner";
import { WaitI18 } from "../../components/WaitI18";
import { withMyApollo } from "../../utils/withMyApollo";
import { CreateCommentGlobalModal } from "../post/comment/create/CreateCommentGlobalModal";
import { CreatePostGlobalModal } from "../post/create/CreatePostGlobalModal";

interface GlobalModalsProps {}
const C: React.FC<GlobalModalsProps> = ({}) => {
  const { data, loading } = useMeQuery({ ssr: false });
  return (
    <WaitI18>
      {loading || !data ? (
        <MyCenterSpinner />
      ) : (
        <>
          <CreatePostGlobalModal loggedUser={data.me} />
          <CreateCommentGlobalModal loggedUser={data.me} />
        </>
      )}
    </WaitI18>
  );
};

export const GlobalModals = withMyApollo()(C);
