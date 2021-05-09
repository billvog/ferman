import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { MyButton } from "../components/MyButton";
import { withMyApollo } from "../utils/withMyApollo";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

const AccessDeniedPage = ({}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  return (
    <Layout title={`${t("503_page.title")} – Ferman`} size="sm">
      <h1 className="heading">{t("503_page.heading")}</h1>
      <div className="text-primary-450 text-sm font-semibold mb-3">
        {t("503_page.subtext")}
      </div>
      <MyButton onClick={router.back} color="secondary">
        <IoMdArrowBack />
        <span className="ml-1.5">{t("common.back")}</span>
      </MyButton>
    </Layout>
  );
};

export default withMyApollo()(AccessDeniedPage);
