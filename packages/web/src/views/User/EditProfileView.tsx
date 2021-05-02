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
          <div className="mt-2">
            <MyAlert color={message.type}>{message.text}</MyAlert>
          </div>
        )}
        <h1 className="heading">Edit Profile</h1>
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
          type="text"
          placeholder="Enter Location"
          maxLength={LocationMax}
        />
        <InputField
          label="Date of Birth"
          name="birthdate"
          type="text"
          value={moment(parseFloat(myInitialValues.birthdate)).format(
            "MMMM Do YYYY"
          )}
          disabled={true}
          helperText={
            <span>
              This field cannot change. If you typed it wrong, please{" "}
              <a href="mailto:support@ferman.ga" className="link text-blue-600">
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
        <div className="flex justify-between items-center mt-4">
          <MyButton type="submit" isLoading={isSubmitting}>
            Update
          </MyButton>
          <span
            className="link text-gray-400 font-semibold text-sm"
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
    },
  })(C)
);
