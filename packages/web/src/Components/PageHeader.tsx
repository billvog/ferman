import { FullUserFragment } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useScreenType } from "../shared-hooks/useScreenType";
import { MySpinner } from "./MySpinner";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  loggedUser: FullUserFragment | null | undefined;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  loggedUser,
}) => {
  const router = useRouter();
  const screenType = useScreenType();

  return (
    <>
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
          <div className="select-none">{title || "Ferman"}</div>
        </div>
        {screenType === "fullscreen" && loggedUser !== null && (
          <div>
            {typeof loggedUser === "undefined" ? (
              <MySpinner />
            ) : (
              <img
                src={loggedUser.profile?.avatarUrl}
                className="w-7 h-7 rounded-full ring-2 ring-primary-300"
                onClick={() => router.push("/account")}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
