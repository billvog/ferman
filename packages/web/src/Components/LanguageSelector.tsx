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

  return (
    <Menu as="div" className="relative flex items-center">
      {({ open }) => (
        <>
          <Menu.Button className="text-md text-accent focus:outline-none">
            <div
              className="flex justify-center items-center font-semibold text-accent hover:text-accent-washed-out hover:bg-accent-transparent text-md rounded-full p-1 transition-colors duration-150"
              title={t("common.change_language")}
            >
              <IoIosGlobe size="21px" />
            </div>
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-in duration-100"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition ease-out duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          >
            <Menu.Items
              static
              className="absolute z-20 w-40 origin-top-left bg-accent-transparent rounded-xl backdrop-filter backdrop-blur-lg focus:outline-none"
              style={{
                top: "-0.5px",
              }}
            >
              <div className="p-1">
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
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
