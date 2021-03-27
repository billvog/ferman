import { FieldError } from "../resolvers/FieldError";

export const validateTitle = (title: string): FieldError | null => {
  if (!title || title.length < 3 || title.length > 60) {
    return {
      field: "title",
      message: "Length must be between 3 and 60",
    };
  }

  return null;
};

export const validateBody = (body: string): FieldError | null => {
  if (!body || body.length < 3 || body.length > 1000) {
    return {
      field: "body",
      message: "Length must be between 3 and 1000",
    };
  }

  return null;
};

export const validateCommentText = (text: string): FieldError | null => {
  if (!text || text.length < 2 || text.length > 500) {
    return {
      field: "text",
      message: "Length must be between 2 and 500",
    };
  }

  return null;
};
