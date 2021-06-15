import { useApolloClient } from "@apollo/client";
import { ErrorText } from "../../components/ErrorText";
import { useLogoutMutation } from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import processString from "react-process-string";
import { toast } from "react-toastify";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserCard } from "../../components/UserCard";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../auth/AuthProvider";

interface AccountControllerProps {}

export const AccountController: React.FC<AccountControllerProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();

  const { me } = useContext(AuthContext);

  return (
    <div>
      {typeof me === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !me ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="divide-y-2 space-y-3">
          <div>
            <UserCard me={me} user={me} />
            <div className="p-3">
              <div className="text-primary-400 text-xs font-semibold mb-4">
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
                  onClick={() => router.push(`/user/${me.uid}`)}
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
          </div>
          <div className="p-3 pt-5">
            <div className="leading-snug font-bold text-primary">
              {t("my_account.private_info")}
            </div>
            <div className="text-primary-400 text-xs mb-2">
              {t("my_account.private_info_subtext")}
            </div>
            <div className="text-primary-500 text-sm">
              <div>
                <b>{t("my_account.email")}:</b> {me.email}
              </div>
              <div>
                <b>{t("my_account.date_of_birth")}:</b>{" "}
                {dayjs(parseFloat(me.profile?.birthdate || "0")).format(
                  "MMM DD YYYY"
                )}
              </div>
              <div>
                <b>{t("my_account.created_date")}:</b>{" "}
                {dayjs(parseFloat(me.createdAt)).format(
                  "MMMM DD YYYY, h:mm:ss a"
                )}
              </div>
            </div>
          </div>
          <div className="p-4">
            <MyButton
              onClick={() => router.push("/account/delete")}
              color="danger"
            >
              {t("my_account.delete_account")}
            </MyButton>
            <div className="text-xs text-primary-400 mt-2">
              {t("my_account.delete_account_subtext")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
