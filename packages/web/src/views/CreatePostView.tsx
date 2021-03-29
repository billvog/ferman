import { Heading, Box, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { ErrorMap, MyMessage, PostFormValues } from "@ferman/controller";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";

interface CreatePostViewProps {
  submit: (values: PostFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
  router: NextRouter;
}

const C: React.FC<CreatePostViewProps & FormikProps<PostFormValues>> = ({
  message,
  isSubmitting,
}) => {
  return (
    <Layout title="Create Post – Ferman" isAuth>
      <Form>
        {message && (
          <Alert status={message.type}>
            <AlertIcon />
            {message.text}
          </Alert>
        )}
        <Heading mb={2} fontSize={30} color="mainDarkBlue" fontFamily="cursive">
          Create Post
        </Heading>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter title"
          type="text"
          maxLength={60}
        />
        <Box mt={4}>
          <InputField
            textarea
            label="Body"
            name="body"
            placeholder="Text..."
            type="text"
            maxLength={1000}
          />
        </Box>
        <Box mt={4}>
          <Button type="submit" isLoading={isSubmitting}>
            Post
          </Button>
        </Box>
      </Form>
    </Layout>
  );
};

export const CreatePostView = withRouter(
  withFormik<CreatePostViewProps, PostFormValues>({
    mapPropsToValues: () => ({
      title: "",
      body: "",
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const errors = await props.submit(values);
      if (errors) setErrors(errors);
      else props.router.back();
    },
  })(C)
);
