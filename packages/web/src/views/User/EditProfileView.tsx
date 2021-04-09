import FormStyles from "../../css/form.module.css";
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
import { Form, FormikProps, withFormik } from "formik";
import moment from "moment";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { MyAlert } from "../../components/MyAlert";
import { MyButton } from "../../components/MyButton";
import { MyCheckbox } from "../../components/MyCheckbox";

type EditProfileViewProps = {
  submit: (values: UpdateProfileFormValues) => Promise<ErrorMap | null>;
  myInitialValues: UpdateProfileFormValues & { birthdate: string };
  message: MyMessage | null;
  router: NextRouter;
};

const C: React.FC<
  EditProfileViewProps & FormikProps<UpdateProfileFormValues>
> = ({ myInitialValues, message, isSubmitting, router, handleChange }) => {
  return (
    <Layout title="Edit Profile – Ferman" size="md" isAuth>
      <Form>
        {message && message.type === "error" && (
          <div style={{ marginBottom: 8 }}>
            <MyAlert type={message.type}>{message.text}</MyAlert>
          </div>
        )}
        <h1>Edit Profile</h1>
        <InputField
          label="Username"
          name="username"
          placeholder="Enter username"
          type="text"
          maxLength={UsernameMax}
        />
        <InputField
          label="Bio"
          name="bio"
          placeholder="Enter Bio..."
          type="text"
          textarea={true}
          maxLength={BioMax}
        />
        <InputField
          label="Location"
          name="location"
          placeholder="Enter Location"
          maxLength={LocationMax}
        />
        <InputField
          label="Date of Birth"
          name="birthdate"
          value={moment(parseFloat(myInitialValues.birthdate)).format(
            "MMMM Do YYYY"
          )}
          defaultValue={1}
          disabled
          helperText={
            <span>
              This field cannot change. If you typed it wrong, please{" "}
              <a
                href="mailto:support@ferman.ga"
                className="link"
                style={{ color: "var(--blue)" }}
              >
                contact us
              </a>
              .
            </span>
          }
        />
        <MyCheckbox
          label="Show birthdate to everyone"
          name="showBirthdate"
          defaultChecked={myInitialValues.showBirthdate}
        />
        <div className={FormStyles.submitSection}>
          <MyButton type="submit" isLoading={isSubmitting}>
            Update
          </MyButton>
          <span
            className="link"
            style={{ color: "grey" }}
            onClick={router.back}
          >
            or Go Back
          </span>
        </div>
      </Form>
    </Layout>
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
      else props.router.back();
    },
  })(C)
);
