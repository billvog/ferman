import * as yup from "yup";

export * from "./yupSchemas/User";
export * from "./yupSchemas/Profile";
export * from "./yupSchemas/Post";
export * from "./yupSchemas/Comment";

export const EmptySchema = yup.object().shape({});
