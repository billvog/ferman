import { gql } from "@apollo/client";
import { Formik } from "formik";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useUpdatePushTokenMutation } from "../../../../../controller/dist";
import { FormContainer } from "../../../components/FormContainer";
import { FormSpacer } from "../../../components/FormSpacer";
import { MyButton } from "../../../components/MyButton";
import { CheckboxWithLabel } from "../../../form-fields/CheckboxWithLabel";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { RegisterForPushNotifications } from "../../../utils/RegisterForPushNotifications";
import { AuthContext } from "../../auth/AuthProvider";

export const NotificationsController: React.FC<any> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const { me } = useContext(AuthContext);
  if (!me) return null;

  const [updatePushToken, { client }] = useUpdatePushTokenMutation();

  return (
    <FormContainer>
      <Formik
        initialValues={{
          allow_notif: me.hasPushToken,
        }}
        onSubmit={async ({ allow_notif }) => {
          if (me.hasPushToken !== allow_notif) {
            if (allow_notif) {
              const pushToken = await RegisterForPushNotifications();
              if (pushToken) {
                const { data } = await updatePushToken({
                  variables: { pushToken },
                });

                if (data?.updatePushToken) {
                  client.writeFragment({
                    id: "User:" + me.id,
                    fragment: gql`
                      fragment _ on User {
                        hasPushToken
                      }
                    `,
                    data: {
                      hasPushToken: true,
                    },
                  });
                }
              }
            } else {
              const { data } = await updatePushToken({
                variables: { pushToken: null },
              });

              if (data?.updatePushToken) {
                client.writeFragment({
                  id: "User:" + me.id,
                  fragment: gql`
                    fragment _ on User {
                      hasPushToken
                    }
                  `,
                  data: {
                    hasPushToken: false,
                  },
                });
              }
            }
          }
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <View>
            <FormSpacer>
              <CheckboxWithLabel
                label={t("settings.notifications.allow_notifications")}
                name="allow_notif"
              />
            </FormSpacer>
            <View style={{ alignItems: "flex-start" }}>
              <MyButton
                isLoading={isSubmitting}
                onPress={submitForm}
                size="medium"
              >
                {t("button.update")}
              </MyButton>
            </View>
          </View>
        )}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});
