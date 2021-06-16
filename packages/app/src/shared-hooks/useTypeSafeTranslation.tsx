import { TranslationKeys } from "@ferman-pkgs/controller";
import { useTranslation } from "react-i18next";

interface DateTranslationType {
  time?: Date;
  date?: Date;
}

export const useTypeSafeTranslation = () => {
  const { t } = useTranslation();

  return {
    t: (s: TranslationKeys, f?: DateTranslationType) => t(s, f),
  };
};
