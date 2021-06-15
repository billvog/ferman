import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AuthContext } from "../modules/auth/AuthProvider";
import { useNavIcons } from "../shared-hooks/useNavIcons";
import { useScreenType } from "../shared-hooks/useScreenType";
import { MySpinner } from "./MySpinner";

interface PageHeaderProps {
  title: string | JSX.Element;
  showBackButton?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
}) => {
  const router = useRouter();
  const screenType = useScreenType();
  const NavIcons = useNavIcons();

  const { me } = useContext(AuthContext);

  return (
    <div className="sticky z-10 top-0 flex justify-between items-center bg-primary-100 text-primary-450 p-3">
      <div className="fullscreen:ml-0 ml-1 flex items-center">
        {showBackButton && (
          <div className="flex mr-2">
            <button
              className="hover:text-primary-500"
              onClick={() => router.back()}
            >
              <BiArrowBack />
            </button>
          </div>
        )}
        <div className="select-none">{title}</div>
      </div>
      {screenType === "fullscreen" && me !== null && (
        <div className="flex items-center space-x-6">
          {typeof me === "undefined" ? (
            <MySpinner />
          ) : (
            <>
              <NavIcons.ChatIcon
                size="20px"
                className="text-primary-600"
                onClick={() => router.push("/chat/my")}
              />
              <img
                src={me.profile.avatarUrl}
                className="w-8 h-8 rounded-35"
                onClick={() => router.push("/account")}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
