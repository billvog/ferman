export * from "./yupSchemas/Profile";
export * from "./yupSchemas/User";
export * from "./yupSchemas/Post";
export * from "./yupSchemas/Comment";

import * as yup from "yup";
export const EmptySchema = yup.object().shape({});
