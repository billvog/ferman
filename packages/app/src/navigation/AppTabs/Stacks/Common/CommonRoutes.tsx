import React from "react";
import { CommonPostRoutes } from "./Post/Routes";
import { CommonUserRoutes } from "./User/Routes";

export const CommonRoutes = (Stack: any) => {
  return (
    <>
      {CommonUserRoutes(Stack)}
      {CommonPostRoutes(Stack)}
    </>
  );
};
