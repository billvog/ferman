import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import { useCreatePostMutation } from "../../generated/graphql";
import { withMyApollo } from "../../utils/withMyApollo";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [createPost] = useCreatePostMutation();

  return (
    <Layout size="xl" title="Create Post – Ferman" isAuth>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPost({
            variables: {
              options: values,
            },
            update: (cache) => {
              cache.evict({ fieldName: "posts" });
            },
          });

          if (response.errors) {
            return toast({
              title: "Error",
              description: "Internal server error (500)",
              status: "error",
              duration: 5000,
            });
          }

          if (response.data?.createPost.error) {
            return setErrors({
              [response.data.createPost.error.field]:
                response.data.createPost.error.message,
            });
          }

          // redirect
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Heading
              mb={2}
              fontSize={30}
              color="mainDarkBlue"
              fontFamily="cursive"
            >
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
        )}
      </Formik>
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(CreatePost);
