import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {
  const is2Cols = useMediaQuery({ minWidth: 912 });
  const is1Cols = useMediaQuery({ minWidth: 612 });

  if (is2Cols) {
    return "2-cols";
  }
  if (is1Cols) {
    return "1-cols";
  }

  return "fullscreen";
};
