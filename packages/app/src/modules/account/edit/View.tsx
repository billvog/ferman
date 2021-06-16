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
import { useNavigation } from "@react-navigation/native";
import { Field, FormikProps, withFormik } from "formik";
import i18next from "i18next";
import React, { useEffect } from "react";
import { FormContainer } from "../../../components/FormContainer";
import { FormSpacer } from "../../../components/FormSpacer";
import { MyAlert } from "../../../components/MyAlert";
import { CheckboxWithLabel } from "../../../form-fields/CheckboxWithLabel";
import { InputField } from "../../../form-fields/InputField";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface EditProfileViewProps {
  submit: (values: UpdateProfileFormValues) => Promise<ErrorMap | null>;
  initialValues: UpdateProfileFormValues;
  message: MyMessage | null;
}

const C: React.FC<EditProfileViewProps & FormikProps<UpdateProfileFormValues>> =
  ({ message, submitForm }) => {
    const { t } = useTypeSafeTranslation();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setParams({ submitForm });
    }, []);

    return (
      <FormContainer>
        {!!message && i18next.exists(message.text) && (
          <FormSpacer>
            <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
          </FormSpacer>
        )}
        <FormSpacer>
          <Field
            name="username"
            placeholder={t("form.placeholder.username")}
            autoCapitalize="none"
            helperText={t("form.helper.username")}
            maxLength={UsernameMax}
            component={InputField}
          />
        </FormSpacer>
        <FormSpacer>
          <Field
            name="bio"
            placeholder={t("form.placeholder.bio")}
            multiline={true}
            maxLength={BioMax}
            component={InputField}
          />
        </FormSpacer>
        <FormSpacer>
          <Field
            name="location"
            placeholder={t("form.placeholder.location")}
            maxLength={LocationMax}
            component={InputField}
          />
        </FormSpacer>
        <FormSpacer>
          <CheckboxWithLabel
            name="showBirthdate"
            label={t("edit_profile.show_birthday_to_everybody")}
          />
        </FormSpacer>
      </FormContainer>
    );
  };

export const EditProfileView = withFormik<
  EditProfileViewProps,
  UpdateProfileFormValues
>({
  validationSchema: UpdateProfileValidationSchema,
  mapPropsToValues: ({ initialValues }) => ({
    username: initialValues.username,
    bio: initialValues.bio,
    location: initialValues.location,
    showBirthdate: initialValues.showBirthdate,
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
