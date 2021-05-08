import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { useLogoutMutation, useMeQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../utils/withMyApollo";
import { UserCard } from "../../components/UserCard";
import { ErrorText } from "../../components/ErrorText";
import moment from "moment";
import { MySpinner } from "../../components/MySpinner";
import { MyButton } from "../../components/MyButton";
import { toast } from "react-toastify";

const MyAccount = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading, error: meError } = useMeQuery({
    ssr: false,
  });

  const [logout] = useLogoutMutation();

  return (
    <Layout title="My Account – Ferman" isAuth>
      <h1 className="heading">My Account</h1>
      {meLoading ? (
        <MySpinner />
      ) : meError || !meData || !meData.me ? (
        <ErrorText>Internal server error, please try again later</ErrorText>
      ) : (
        <div className="divide-y-2 space-y-3">
          <div>
            <UserCard me={meData.me} user={meData.me} />
            <div className="text-primary-400 text-xs font-semibold mt-3 mb-4">
              Ferman uses gravatar for avatars. Learn more about gravatar{" "}
              <a
                href="https://en.gravatar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="link text-blue-500"
              >
                here
              </a>
              .
            </div>
            <div className="flex flex-row space-x-2">
              <MyButton
                onClick={() => router.push(`/user/${meData?.me?.uid}`)}
                color="accent"
              >
                My Profile
              </MyButton>
              <MyButton
                color="primary"
                onClick={async () => {
                  const reponse = await logout();
                  if (!reponse.data?.logout) {
                    return toast.error(
                      "Internal server error, please try again later"
                    );
                  }

                  await apolloClient.resetStore();
                  router.replace("/"); // redirect
                }}
              >
                Sign out
              </MyButton>
            </div>
          </div>
          <div className="pt-2.5">
            <div className="leading-none font-bold text-primary">
              Private Information
            </div>
            <div className="text-primary-400 text-xs mb-2">
              These information are not visible in the public.
            </div>
            <div className="text-primary-500 text-sm">
              <div>
                <b>Email:</b> {meData.me.email}
              </div>
              <div>
                <b>Date of birth:</b>{" "}
                {moment(parseFloat(meData.me.profile!.birthdate)).format(
                  "MMM Do YYYY"
                )}
              </div>
              <div>
                <b>Created date:</b>{" "}
                {moment(parseFloat(meData.me.createdAt))
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
              Delete Account
            </MyButton>
            <div className="text-xs text-primary-400 mt-1">
              This will completely remove your account and anything that's
              associated with it (posts, comments, likes, follows, etc). Be
              careful with this, <b>any action cannot be undone</b>. Deleting
              your account requires your password.
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(MyAccount);
