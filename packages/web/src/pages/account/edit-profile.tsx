import { Heading } from "@chakra-ui/layout";
import { Flex, Button, Link, useToast, Box, Checkbox } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { Formik, Form } from "formik";
import router from "next/router";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useMeQuery, useUpdateProfileMutation } from "../../generated/graphql";
import { withMyApollo } from "../../utils/withMyApollo";
import moment from "moment";

const EditProfile = ({}) => {
  const toast = useToast();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  const [updateProfile] = useUpdateProfileMutation();

  return (
    <Layout title="Edit Profile – Ferman" size="md" isAuth>
      {meLoading && !meData ? (
        <Spinner />
      ) : !meData || !meData.me?.profile ? (
        <ErrorText>User or profile not found (404)</ErrorText>
      ) : (
        <Formik
          initialValues={{
            username: meData.me.username,
            bio: meData.me.profile.bio,
            location: meData.me.profile.location,
            showBirthdate: meData.me.profile.showBirthdate,
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await updateProfile({
              variables: {
                options: values,
              },
            });

            if (!data) {
              return toast({
                title: "Error",
                description: "Internal server error (500)",
                status: "error",
                duration: 5000,
              });
            }

            if (data?.updateProfile.error) {
              return setErrors({
                [data.updateProfile.error.field]:
                  data.updateProfile.error.message,
              });
            }

            // redirect
            toast({
              title: "Success",
              description: "Profile updated",
              status: "success",
              duration: 5000,
            });

            return router.back();
          }}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <Heading
                mb={2}
                fontSize={30}
                color="mainDarkBlue"
                fontFamily="cursive"
              >
                Edit Profile
              </Heading>
              <InputField
                label="Username"
                name="username"
                placeholder="Enter username"
                type="text"
                maxLength={32}
              />
              <Box mt={4}>
                <InputField
                  label="Bio"
                  name="bio"
                  placeholder="Enter Bio..."
                  type="text"
                  textarea={true}
                  maxLength={160}
                />
              </Box>
              <Box mt={4}>
                <InputField
                  label="Location"
                  name="location"
                  placeholder="Enter Location"
                  maxLength={30}
                />
              </Box>
              <Box mt={4}>
                <InputField
                  label="Birthdate"
                  name="birthdate"
                  value={moment(
                    parseFloat(meData.me!.profile!.birthdate)
                  ).format("MMMM Do YYYY")}
                  defaultValue={1}
                  disabled
                />
                <Checkbox
                  size="sm"
                  colorScheme="blue"
                  color="grey"
                  mt={1}
                  defaultChecked={meData.me?.profile?.showBirthdate}
                  name="showBirthdate"
                  onChange={handleChange}
                >
                  Show birthdate to everyone
                </Checkbox>
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
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(EditProfile);
