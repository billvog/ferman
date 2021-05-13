import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
export const SearchTips = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <div className="mt-2 text-sm text-primary-700">
      <b>{t("search.search_tips.heading")}</b> <br />
      <ul className="list-disc ml-5">
        <li>{t("search.search_tips.tip_1")}</li>
        <li>{t("search.search_tips.tip_2")}</li>
        <li>{t("search.search_tips.tip_3")}</li>
      </ul>
    </div>
  );
};
