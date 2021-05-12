import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
}) => {
  const router = useRouter();

  return (
    <>
      {title.length > 0 && (
        <div className="sticky top-0 flex items-center bg-primary-100 text-primary-450 p-3">
          {showBackButton && (
            <div className="flex mr-2">
              <button
                className="hover:text-primary-500"
                onClick={() => router.back()}
              >
                <BiArrowBack />
              </button>
            </div>
          )}
          <div className="select-none">{title}</div>
        </div>
      )}
    </>
  );
};
