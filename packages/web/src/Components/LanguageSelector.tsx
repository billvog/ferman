import { createPortal } from "react-dom";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { IoIosGlobe } from "react-icons/io";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

interface LanguageSelectorProps {}

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const options = [
    { value: "en", flag: "🇬🇧", label: "English" },
    { value: "el", flag: "🇬🇷", label: "Ελληνικά" },
  ];

  const { t } = useTypeSafeTranslation();
  const { i18n } = useTranslation();
  console.log(`Used: ${i18n.language}`);

  const [domReady, setDomReady] = React.useState(false);

  React.useEffect(() => {
    setDomReady(true);
  });

  return (
    <Menu as="div" className="relative flex items-center">
      {({ open }) => (
        <>
          <Menu.Button className="text-md text-accent focus:outline-none">
            <div
              className="flex justify-center items-center font-semibold text-accent hover:text-accent-washed-out hover:bg-accent-transparent text-md rounded-full p-1 transition-colors duration-150"
              title={t("common_sidebar.change_language.button_title")}
            >
              <IoIosGlobe size="24px" />
            </div>
          </Menu.Button>
          {domReady &&
            createPortal(
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-in duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Menu.Items
                  static
                  className="fixed z-20 left-0 transform translate-x-5 translate-y-3/4 2cols:left-auto 2cols:-translate-x-32 2cols:translate-y-4 w-40 bg-accent-transparent rounded-xl backdrop-filter backdrop-blur-lg focus:outline-none divide-y-2 divide-accent-transparent"
                >
                  <div className="px-3 py-1.5 select-none">
                    <div className="text-md font-bold text-accent">
                      {t("common_sidebar.change_language.dialog_header")}
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="max-h-40 overflow-auto">
                      {options.map((option) => (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-accent-hover text-white"
                                  : "text-accent-600"
                              } group flex rounded-md items-center w-full p-1.5 text-xs font-bold space-x-1.5`}
                              onClick={() => {
                                i18n.changeLanguage(option.value);
                              }}
                            >
                              <span className="mr-1.5">{option.flag}</span>
                              <span>{option.label}</span>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </div>
                </Menu.Items>
              </Transition>,
              document.getElementById("main")!
            )}
        </>
      )}
    </Menu>
  );
};
