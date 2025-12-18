import { dayjs } from "@/shared/lib/utils/dayjs";

interface UpcomingInfoProps {
  startedAt: string;
  startPrice: number;
}

export default function UpcomingInfo({ startedAt, startPrice }: UpcomingInfoProps) {
  return (
    <dl className="grid grid-cols-[auto_1fr] items-center gap-y-1.5 text-sm">
      <dt className="text-muted-foreground">경매 시작</dt>
      <dd className="text-muted-foreground text-right">
        <time dateTime={startedAt}>
          {dayjs.utc(startedAt).tz("Asia/Seoul").format("M월 D일 HH시 mm분")}
        </time>
      </dd>

      <dt className="text-muted-foreground">시작 예정가</dt>
      <dd className="text-right">
        <strong className="text-brand dark:text-brand-text text-base font-bold">
          {startPrice.toLocaleString()}원
        </strong>
      </dd>
    </dl>
  );
}
