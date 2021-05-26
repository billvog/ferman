import { useRouter } from "next/router";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { IoIosGlobe } from "react-icons/io";
import { MySpinner } from "../../../components/MySpinner";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../../types/WithAuthProps";

interface ListItemProps {
  icon: JSX.Element;
  text: string;
  title?: string;
  onClick: () => any;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  return (
    <div
      className="p-3 hover:bg-primary-50 text-primary-500 text-base font-semibold flex items-center justify-between cursor-pointer transition-colors"
      onClick={props.onClick}
      title={props.title}
    >
      <div className="flex items-center">
        <div>{props.icon}</div>
        <div className="ml-2.5">{props.text}</div>
      </div>
      <div>
        <HiChevronRight size="20px" />
      </div>
    </div>
  );
};

interface SettingsControllerProps extends WithAuthProps {}
export const SettingsController: React.FC<SettingsControllerProps> = ({
  loggedUser,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  return (
    <div>
      {!loggedUser ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : (
        <div className="divide-y border-b">
          <ListItem
            icon={<IoIosGlobe />}
            text={t("settings.language.text")}
            title={t("settings.language.title")}
            onClick={() => router.push("/account/settings/language")}
          />
        </div>
      )}
    </div>
  );
};
