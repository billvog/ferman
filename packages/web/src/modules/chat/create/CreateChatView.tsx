import { NewChatValidationSchema, UidMax } from "@ferman-pkgs/common";
import {
  CreateChatFormValues,
  ErrorMap,
  MyMessage,
  useUsersLazyQuery,
} from "@ferman-pkgs/controller";
import { Popover } from "@headlessui/react";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface CreateChatViewProps {
  submit: (values: CreateChatFormValues) => Promise<{
    chatId?: number;
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
  router: NextRouter;
}

const C: React.FC<CreateChatViewProps & FormikProps<CreateChatFormValues>> = ({
  message,
  isSubmitting,
  values,
  setFieldValue,
}) => {
  const { t } = useTypeSafeTranslation();

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [
    runUsersQuery,
    {
      data: usersData,
      loading: usersLoading,
      fetchMore: fetchMoreUsers,
      variables: usersVariables,
    },
  ] = useUsersLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 4,
      skip: null,
      query: null,
      notMe: true,
    },
  });

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(values.reciever_uid);
    }, 250);

    return () => {
      clearTimeout(handle);
    };
  }, [values.reciever_uid]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      return runUsersQuery({
        variables: {
          ...usersVariables!,
          query: debouncedQuery,
          skip: null,
        },
      });
    }
  }, [debouncedQuery]);

  return (
    <div>
      <Form className="px-4 py-2">
        {message && <MyAlert color={message.type}>{message.text}</MyAlert>}
        <div className="mb-3">
          <InputField
            label={t("chat.create_chat.label.reciever")}
            name="reciever_uid"
            placeholder={t("chat.create_chat.placeholder.reciever")}
            type="text"
            maxLength={UidMax}
            autoComplete="off"
          />
        </div>
        <MyButton type="submit" isLoading={isSubmitting}>
          {t("chat.new_chat")}
        </MyButton>
      </Form>
      {debouncedQuery.length > 0 &&
        !!usersData?.users?.users?.length &&
        usersData?.users.users[0].uid !== values.reciever_uid && (
          <Popover className="relative mt-3">
            <Popover.Panel
              static
              className="block z-10 border border-r-0 border-l-0 bg-primary-50 w-full max-h-32 overflow-y-auto overflow-x-hidden"
            >
              <div className="text-vs p-2 text-primary-450 border-b">
                {usersData.users.count !== 1
                  ? t("common.found_x_results")
                      .replace("%count%", usersData.users.count.toString())
                      .replace(
                        "%seconds%",
                        Number(usersData.users.executionTime / 1000).toString()
                      )
                  : t("common.found_one_result").replace(
                      "%seconds%",
                      Number(usersData.users.executionTime / 1000).toString()
                    )}
              </div>
              <div className="divide-y-2 divide-primary-200">
                {usersData?.users.users.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 flex items-center group cursor-pointer hover:bg-primary-100"
                    onClick={() => setFieldValue("reciever_uid", user.uid)}
                  >
                    <img
                      src={user.profile?.avatarUrl}
                      className="w-7 h-7 rounded-35"
                    />
                    <div className="ml-2 flex flex-col leading-tight">
                      <div className="text-primary-600 text-md font-bold group-hover:underline">
                        {user.username}
                      </div>
                      <div className="text-primary-450 text-vs">
                        @{user.uid}
                      </div>
                    </div>
                  </div>
                ))}
                {usersData?.users.hasMore && (
                  <div className="p-2 w-full flex justify-center">
                    <MyButton
                      size="small"
                      isLoading={usersLoading}
                      onClick={() => {
                        fetchMoreUsers!({
                          variables: {
                            ...usersVariables,
                            skip: usersData.users.users.length,
                          },
                        });
                      }}
                    >
                      {t("common.load_more")}
                    </MyButton>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Popover>
        )}
    </div>
  );
};

export const CreateChatView = withRouter(
  withFormik<CreateChatViewProps, CreateChatFormValues>({
    validationSchema: NewChatValidationSchema,
    mapPropsToValues: () => ({
      reciever_uid: "",
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const { errors, chatId } = await props.submit(values);
      if (errors) setErrors(errors);
      else props.router.replace(`/chat/${chatId}`);
    },
  })(C)
);
