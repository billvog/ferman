import React from "react";
import AlertStyles from "../css/alert.module.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdError } from "react-icons/md";

interface MyAlertProps {
  type: "success" | "error";
}

export const MyAlert: React.FC<MyAlertProps> = ({ type, children }) => {
  return (
    <div
      className={`${AlertStyles.alert} ${
        type === "success" ? AlertStyles.success : AlertStyles.error
      }`}
    >
      <div className={AlertStyles.alertIcon}>
        {type === "success" ? <AiFillCheckCircle /> : <MdError />}
      </div>
      <div className={AlertStyles.content}>{children}</div>
    </div>
  );
};
