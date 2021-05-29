import {
  BioMax,
  LocationMax,
  UpdateProfileValidationSchema,
  UsernameMax,
} from "@ferman-pkgs/common";
import {
  ErrorMap,
  MyMessage,
  UpdateProfileFormValues,
} from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { MyCheckbox } from "../../../components/MyCheckbox";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

type EditProfileViewProps = {
  submit: (values: UpdateProfileFormValues) => Promise<ErrorMap | null>;
  myInitialValues: UpdateProfileFormValues & { birthdate: string };
  message: MyMessage | null;
  router: NextRouter;
};

const C: React.FC<EditProfileViewProps & FormikProps<UpdateProfileFormValues>> =
  ({ myInitialValues, message, isSubmitting, router }) => {
    const { i18n } = useTranslation();
    const { t } = useTypeSafeTranslation();

    return (
      <Form className="px-4 py-2">
        {message && i18n.exists(message.text) && (
          <div className="mb-2">
            <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
          </div>
        )}
        <InputField
          label={t("form.label.username")}
          name="username"
          placeholder={t("form.placeholder.username")}
          type="text"
          maxLength={UsernameMax}
        />
        <InputField
          label={t("form.label.bio")}
          name="bio"
          placeholder={t("form.placeholder.bio")}
          type="text"
          textarea={true}
          maxLength={BioMax}
        />
        <InputField
          label={t("form.label.location")}
          name="location"
          type="text"
          placeholder={t("form.placeholder.location")}
          maxLength={LocationMax}
        />
        <InputField
          label={t("form.label.date_of_birth")}
          name="birthdate"
          type="text"
          value={dayjs(parseFloat(myInitialValues.birthdate)).format(
            "MMMM DD YYYY"
          )}
          disabled={true}
        />
        <MyCheckbox
          label={t("edit_profile.show_birthday_to_everybody")}
          name="showBirthdate"
          defaultChecked={myInitialValues.showBirthdate}
        />
        <div className="mt-4">
          <MyButton type="submit" isLoading={isSubmitting}>
            {t("button.update")}
          </MyButton>
        </div>
      </Form>
    );
  };

export const EditProfileView = withRouter(
  withFormik<EditProfileViewProps, UpdateProfileFormValues>({
    validationSchema: UpdateProfileValidationSchema,
    mapPropsToValues: ({ myInitialValues }) => ({
      username: myInitialValues.username,
      bio: myInitialValues.bio,
      location: myInitialValues.location,
      showBirthdate: myInitialValues.showBirthdate,
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const errors = await props.submit(values);
      if (errors) setErrors(errors);
    },
  })(C)
);
