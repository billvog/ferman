import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MyButton } from "../../components/MyButton";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const PageNotFound = ({}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <h1 className="heading">{t("404_page.heading")}</h1>
      <div className="text-primary-450 text-sm font-semibold mb-3">
        {t("404_page.subtext")}
      </div>
      <MyButton onClick={router.back} color="secondary">
        <IoMdArrowBack />
        <span className="ml-1.5">{t("common.back")}</span>
      </MyButton>
    </>
  );
};
