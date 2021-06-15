import { TextStyle } from "react-native";

export const radius = {
  s: 5,
  m: 8,
  l: 16,
};

export const fontFamily = {
  inter: {
    regular: "Inter",
    black: "Inter-Black",
    bold: "Inter-Bold",
    extraBold: "Inter-ExtraBold",
    light: "Inter-Light",
    medium: "Inter-Medium",
    thin: "Inter-Thin",
  },
};

export const fontSize = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
  h5: 17,
  h6: 15,
  paragraph: 14,
  md: 13,
  small: 12,
  xs: 10,
};

export const colors = {
  text: "#fff",
  // primary
  primary50: "#f9fafb",
  primary100: "#f3f4f6",
  primary200: "#e5e7eb",
  primary300: "#d1d5db",
  primary400: "#9ca3af",
  primary450: "#8891a0",
  primary500: "#6b7280",
  primary600: "#4b5563",
  primary700: "#374151",
  primary800: "#1f2937",
  primary900: "#111827",
  // secondary
  secondary50: "#deb887",
  secondary100: "#c5a289",
  secondary200: "#b98f71",
  secondary300: "#ae7d5a",
  secondary400: "#a26a42",
  secondary500: "#97582b",
  secondary600: "#8b4513",
  secondary700: "#6f370f",
  secondary800: "#53290b",
  secondary900: "#381c08",
  // accent
  accent: "#a52a2a",
  accentWashedOut: "#ae3f3f",
  accentHover: "#a52a2a",
  black: "#000",
  // status
  success: "#10B981",
  error: "#EF4444",
  danger: "#DC2626",
  info: "#3b82f6",
  // other
  hashtag: "#6366f1",
};

const textBase: TextStyle = {
  fontFamily: fontFamily.inter.regular,
};

export const h1: TextStyle = {
  ...textBase,
  lineHeight: 90,
  fontSize: fontSize.h1,
  fontWeight: "700",
};

export const h2: TextStyle = {
  ...textBase,
  lineHeight: 64,
  fontSize: fontSize.h2,
  fontWeight: "700",
};

export const h3: TextStyle = {
  ...textBase,
  lineHeight: 45,
  fontSize: fontSize.h3,
  fontWeight: "700",
};

export const h4: TextStyle = {
  ...textBase,
  lineHeight: 32,
  fontSize: fontSize.h4,
  fontWeight: "700",
};

export const h5: TextStyle = {
  ...textBase,
  lineHeight: 28,
  fontSize: fontSize.h5,
  fontWeight: "700",
};

export const h6: TextStyle = {
  ...textBase,
  lineHeight: 26,
  fontSize: fontSize.h6,
  fontWeight: "700",
};

export const paragraph: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.paragraph,
  lineHeight: 19,
};

export const paragraphBold: TextStyle = {
  ...paragraph,
  fontWeight: "700",
};

export const small: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.small,
  lineHeight: 17,
};

export const smallBold: TextStyle = {
  ...small,
  fontWeight: "700",
};

export const xsmall: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.xs,
  lineHeight: 15,
};

export const xsmallBold: TextStyle = {
  ...xsmall,
  fontWeight: "700",
};
