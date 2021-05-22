import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "@ferman-pkgs/controller";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import processString from "react-process-string";
import { toast } from "react-toastify";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserCard } from "../../components/UserCard";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../types/PageWithAuthProps";

interface AccountControllerProps extends PageWithAuthProps {}

export const AccountController: React.FC<AccountControllerProps> = ({
  loggedUser,
}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();

  return (
    <div>
      {typeof loggedUser === "undefined" ? (
        <MySpinner />
      ) : !loggedUser ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="divide-y-2 space-y-3">
          <div>
            <UserCard me={loggedUser} user={loggedUser} />
            <div className="text-primary-400 text-xs font-semibold mt-3 mb-4">
              {processString([
                {
                  regex: /@(.*)@/,
                  fn: (key: any, res: any) => (
                    <a
                      href="http://en.gravatar.com/support/what-is-gravatar/"
                      target="blank"
                      key={key}
                    >
                      <span className="text-accent hover:text-accent-washed-out hover:underline font-bold cursor-pointer">
                        {res[1]}
                      </span>
                    </a>
                  ),
                },
              ])(t("my_account.gravatar_info"))}
            </div>
            <div className="flex flex-row space-x-2">
              <MyButton
                onClick={() => router.push(`/loggedUser/${loggedUser.uid}`)}
                color="accent"
              >
                {t("my_account.my_profile")}
              </MyButton>
              <MyButton
                color="secondary"
                onClick={() => router.push("/account/settings")}
              >
                {t("my_account.settings")}
              </MyButton>
              <MyButton
                color="primary"
                onClick={async () => {
                  const reponse = await logout();
                  if (!reponse.data?.logout) {
                    return toast.error(t("errors.500"));
                  }

                  await apolloClient.resetStore();
                  router.replace("/");
                }}
              >
                {t("my_account.sign_out")}
              </MyButton>
            </div>
          </div>
          <div className="pt-2.5">
            <div className="leading-snug font-bold text-primary">
              {t("my_account.private_info")}
            </div>
            <div className="text-primary-400 text-xs mb-2">
              {t("my_account.private_info_subtext")}
            </div>
            <div className="text-primary-500 text-sm">
              <div>
                <b>{t("my_account.email")}:</b> {loggedUser.email}
              </div>
              <div>
                <b>{t("my_account.date_of_birth")}:</b>{" "}
                {moment(
                  parseFloat(loggedUser.profile?.birthdate || "0")
                ).format("MMM Do YYYY")}
              </div>
              <div>
                <b>{t("my_account.created_date")}:</b>{" "}
                {moment(parseFloat(loggedUser.createdAt))
                  .local()
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </div>
            </div>
          </div>
          <div className="pt-4">
            <MyButton
              onClick={() => router.push("/account/delete")}
              color="danger"
            >
              {t("my_account.delete_account")}
            </MyButton>
            <div className="text-xs text-primary-400 mt-1">
              {t("my_account.delete_account_subtext")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
