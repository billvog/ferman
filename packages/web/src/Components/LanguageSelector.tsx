import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { IoIosGlobe } from "react-icons/io";

interface LanguageSelectorProps {}

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const options = [
    { value: "en", flag: "🇬🇧", label: "English" },
    { value: "el", flag: "🇬🇷", label: "Ελληνικά" },
  ];

  const { i18n } = useTranslation();
  console.log(`Lang used: ${i18n.language}`);

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="text-md text-accent focus:outline-none">
            <div className="flex items-center text-accent rounded-full p-2 transition-colors duration-150">
              <IoIosGlobe />
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
              className="absolute z-20 right-2 w-40 origin-top-right bg-secondary-50 rounded-xl focus:outline-none"
            >
              <div className="px-1 rounded-tl-xl bg-secondary-400 text-secondary-50">
                <div className="p-1.5 text-vs font-bold leading-tight">
                  Choose language
                </div>
              </div>
              <div className="p-1">
                {options.map((option) => (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-secondary-600 text-secondary-50"
                            : "text-secondary-600"
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
