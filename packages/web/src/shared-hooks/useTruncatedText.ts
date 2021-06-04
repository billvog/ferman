export const useTrancatedText = (text: string, length: number): string => {
  return text.substr(0, length - 1) + (text.length > length ? "..." : "");
};
