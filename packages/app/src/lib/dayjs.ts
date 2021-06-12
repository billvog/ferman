import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const init_dayjs = () => {
  dayjs.extend(relativeTime);
};
