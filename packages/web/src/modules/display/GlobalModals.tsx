import React from "react";
import { WaitI18 } from "../../components/WaitI18";
import { withMyApollo } from "../../utils/withMyApollo";
import { CreatePostGlobalModal } from "../post/create/CreatePostGlobalModal";

interface GlobalModalsProps {}
export const GlobalModals: React.FC<GlobalModalsProps> = ({}) => {
  return (
    <WaitI18>
      <CreatePostGlobalModal />
    </WaitI18>
  );
};
