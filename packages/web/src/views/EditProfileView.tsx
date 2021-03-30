import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  useToast,
} from "@chakra-ui/react";
import {
  BioMax,
  LocationMax,
  UpdateProfileValidationSchema,
  UsernameMax,
} from "@ferman/common";
import {
  ErrorMap,
  MyMessage,
  UpdateProfileFormValues,
} from "@ferman/controller";
import { Form, FormikProps, withFormik } from "formik";
import moment from "moment";
import { NextRouter, withRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";

type EditProfileViewProps = {
  submit: (values: UpdateProfileFormValues) => Promise<ErrorMap | null>;
  myInitialValues: UpdateProfileFormValues & { birthdate: string };
  message: MyMessage | null;
  router: NextRouter;
};

const C: React.FC<
  EditProfileViewProps & FormikProps<UpdateProfileFormValues>
> = ({ myInitialValues, message, isSubmitting, router, handleChange }) => {
  const toast = useToast();

  useEffect(() => {
    if (!message) {
      return;
    }

    if (message.type === "success") {
      toast({
        title: "Success",
        status: message.type,
        description: message.text,
        duration: 5000,
      });
    }
  }, [message]);

  return (
    <Layout title="Edit Profile – Ferman" size="md" isAuth>
      <Form>
        {message && message.type === "error" && (
          <Alert status={message.type}>
            <AlertIcon />
            {message.text}
          </Alert>
        )}
        <Heading mb={2} fontSize={30} color="mainDarkBlue">
          Edit Profile
        </Heading>
        <InputField
          label="Username"
          name="username"
          placeholder="Enter username"
          type="text"
          maxLength={UsernameMax}
        />
        <Box mt={4}>
          <InputField
            label="Bio"
            name="bio"
            placeholder="Enter Bio..."
            type="text"
            textarea={true}
            maxLength={BioMax}
          />
        </Box>
        <Box mt={4}>
          <InputField
            label="Location"
            name="location"
            placeholder="Enter Location"
            maxLength={LocationMax}
          />
        </Box>
        <Box mt={4}>
          <InputField
            label="Date of Birth"
            name="birthdate"
            value={moment(parseFloat(myInitialValues.birthdate)).format(
              "MMMM Do YYYY"
            )}
            defaultValue={1}
            disabled
            helperText="This field cannot change."
          />
          <Box mt={2}>
            <Checkbox
              size="sm"
              colorScheme="blue"
              color="grey"
              mt={1}
              defaultChecked={myInitialValues.showBirthdate}
              name="showBirthdate"
              onChange={handleChange}
            >
              Show birthdate to everyone
            </Checkbox>
          </Box>
        </Box>
        <Flex mt={4} justifyContent="space-between" align="center">
          <Button type="submit" isLoading={isSubmitting}>
            Update
          </Button>
          <Link color="grey" onClick={router.back}>
            or Go Back
          </Link>
        </Flex>
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
