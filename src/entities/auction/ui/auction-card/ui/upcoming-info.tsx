import { dayjs } from "@/shared/lib/utils/dayjs";

interface UpcomingInfoProps {
  startedAt: string;
  startPrice: number;
}

export default function UpcomingInfo({ startedAt, startPrice }: UpcomingInfoProps) {
  return (
    <dl className="grid grid-cols-2 items-center gap-y-1.5 text-sm">
      <dt className="text-zinc-600">경매 시작</dt>
      <dd className="text-right text-zinc-900">
        <time dateTime={startedAt}>
          {dayjs.tz(startedAt, "Asia/Seoul").format("M월 D일 A h시 m분")}
        </time>
      </dd>

      <dt className="text-gray-600">시작 예정가</dt>
      <dd className="text-right">
        <strong className="text-brand text-base font-bold">{startPrice.toLocaleString()}원</strong>
      </dd>
    </dl>
  );
}
