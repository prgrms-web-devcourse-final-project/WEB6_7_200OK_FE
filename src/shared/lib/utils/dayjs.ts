import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

dayjs.locale("ko");
dayjs.tz.setDefault("Asia/Seoul");

export { dayjs, type Dayjs };
