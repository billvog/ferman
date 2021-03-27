import { Button, Heading, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../../Components/InputField";
import { Layout } from "../../../../Components/Layout";
import { useCommentPostMutation } from "../../../../generated/graphql";
import { useGetStringId } from "../../../../Utils/useGetStringId";
import { withMyApollo } from "../../../../Utils/withMyApollo";

const NewComment = ({}) => {
  const router = useRouter();
  const toast = useToast();

  const postId = useGetStringId();
  const [commentPost] = useCommentPostMutation();

  return (
    <Layout title="Create Comment – Ferman" isAuth>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async (values, { setErrors }) => {
          if (postId === "") {
            return;
          }

          const { data, errors } = await commentPost({
            variables: {
              id: postId,
              parentId:
                typeof router.query.reply === "string"
                  ? parseInt(router.query.reply)
                  : null,
              options: values,
            },
            update: (cache) => {
              cache.evict({ fieldName: "comments" });
              cache.evict({ fieldName: "viewComment" });
              cache.evict({ id: "Post:" + postId });
            },
          });

          if (!data || errors) {
            return toast({
              title: "Failed",
              description: "Internal server error",
              status: "error",
              duration: 5000,
            });
          }

          if (data?.createComment.error) {
            return setErrors({
              [data.createComment.error.field]:
                data.createComment.error.message,
            });
          }

          toast({
            title: "Success",
            description: "Comment posted",
            status: "success",
            duration: 5000,
          });

          router.back();
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
              {typeof router.query.reply === "string"
                ? "Reply comment"
                : "Comment"}
            </Heading>
            <InputField
              label="Text"
              name="text"
              placeholder="Comment Text..."
              textarea
              maxLength={500}
            />
            <Button type="submit" mt={2} isLoading={isSubmitting}>
              {typeof router.query.reply === "string" ? "Reply" : "Comment"}
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(NewComment);
