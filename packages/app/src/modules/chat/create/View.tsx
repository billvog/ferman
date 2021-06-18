import { NewChatValidationSchema, UidMax } from "@ferman-pkgs/common";
import {
  CreateChatFormValues,
  ErrorMap,
  MyMessage,
  useUsersLazyQuery,
} from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { Field, FormikProps, withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { MyAlert } from "../../../components/MyAlert";
import { ScrollViewLoadMore } from "../../../components/ScrollViewLoadMore";
import { Spinner } from "../../../components/Spinner";
import { colors, fontFamily } from "../../../constants/style";
import { InputField } from "../../../form-fields/InputField";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { UserListItem } from "./UserListItem";

interface CreateChatViewProps {
  submit: (values: CreateChatFormValues) => Promise<{
    chatId?: string;
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
}

const C: React.FC<CreateChatViewProps & FormikProps<CreateChatFormValues>> = ({
  message,
  isSubmitting,
  submitForm,
  values,
  setFieldValue,
}) => {
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setParams({ submitForm });
  }, []);

  const [
    runUsersQuery,
    {
      data: usersData,
      loading: usersLoading,
      fetchMore: loadMoreUsers,
      variables: usersVariables,
    },
  ] = useUsersLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 10,
      skip: 0,
      query: null,
      notMe: true,
    },
  });

  const [debouncedQuery, setDebouncedQuery] = useState("");

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

  if (isSubmitting) {
    return <CenterSpinner />;
  }

  return (
    <View style={{ flex: 1 }}>
      {message && <MyAlert color={message.type}>{message.text}</MyAlert>}
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 14,
        }}
      >
        <Field
          name="reciever_uid"
          placeholder={t("chat.create_chat.placeholder.reciever")}
          autoCapitalize="none"
          maxLength={UidMax}
          component={InputField}
        />
      </View>
      {usersData && (
        <ScrollViewLoadMore
          isLoading={usersLoading}
          onLoadMore={() => {
            loadMoreUsers?.({
              variables: {
                ...usersVariables,
                skip: usersData?.users.users.length,
              },
            });
          }}
          shouldLoadMore={usersData?.users.hasMore || false}
          scrollViewProps={{
            style: {
              flex: 1,
              borderTopWidth: 1.5,
              borderTopColor: colors.primary200,
            },
          }}
        >
          {usersLoading && !usersData.users ? (
            <View
              style={{
                alignItems: "center",
                margin: 24,
              }}
              children={<Spinner size="s" />}
            />
          ) : usersData?.users.count === 0 ? (
            <View
              style={{
                padding: 14,
              }}
            >
              <Text
                style={{
                  color: colors.error,
                  fontFamily: fontFamily.inter.bold,
                }}
              >
                {t("search.found_nothing")}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "column",
              }}
            >
              {usersData?.users.users.map((u) => (
                <UserListItem
                  key={`search:create-chat:${u.id}`}
                  user={u}
                  onPress={() => setFieldValue("reciever_uid", u.uid)}
                />
              ))}
            </View>
          )}
        </ScrollViewLoadMore>
      )}
    </View>
  );
};

export const CreateChatView = withFormik<
  CreateChatViewProps,
  CreateChatFormValues
>({
  validationSchema: NewChatValidationSchema,
  mapPropsToValues: () => ({
    reciever_uid: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const { errors, chatId } = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
