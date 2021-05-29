import React, { useState } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { MySpinner } from "../../../../components/MySpinner";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../../../types/WithAuthProps";
import dayjs from "dayjs";

interface LanguageControllerProps extends WithAuthProps {}
export const LanguageController: React.FC<LanguageControllerProps> = ({
  loggedUser,
}) => {
  const options = [
    { value: "en", flag: "🇬🇧", label: "English" },
    { value: "el", flag: "🇬🇷", label: "Ελληνικά" },
  ];

  const { t } = useTypeSafeTranslation();
  const { i18n } = useTranslation();

  const [query, setQuery] = useState("");

  return (
    <div>
      {!loggedUser ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : (
        <div>
          <div className="border-t">
            <input
              className="bg-primary-50 px-4 py-3 hover:bg-transparent focus:bg-primary-50 transition-colors border-none w-full text-md leading-6 focus:ring-0"
              type="text"
              placeholder={t("settings.language.search_placeholder")}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </div>
          <div className="divide-y border-t border-b">
            {options.map((option) =>
              query.length === 0 ||
              option.value.toLowerCase().includes(query.toLowerCase()) ||
              option.label.toLowerCase().includes(query.toLowerCase()) ? (
                <div
                  key={option.value}
                  className="flex justify-between items-center w-full p-3 text-md text-primary-700 font-semibold hover:bg-primary-50 cursor-pointer transition-colors"
                  onClick={() => {
                    i18n.changeLanguage(option.value);
                    dayjs.locale(option.value);
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-3">{option.flag}</div>
                    <div>{option.label}</div>
                  </div>
                  {option.value === i18n.language && (
                    <div title={t("settings.language.selected_language")}>
                      <GrRadialSelected size="12px" />
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};
