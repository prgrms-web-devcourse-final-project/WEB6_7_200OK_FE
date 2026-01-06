"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import type { RecentPriceHistoryType } from "@/features/auction/auction-log/model/types";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/ui";

const chartConfig = {
  watch: {
    label: "관심도",
    color: "var(--color-brand)",
  },
} satisfies ChartConfig;

export default function AuctionLogChart({ item }: { item: RecentPriceHistoryType[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-medium">관심도</h3>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={item}
          margin={{
            left: 0,
            right: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="currentPrice" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="viewerCount"
            type="natural"
            fill="var(--color-brand)"
            fillOpacity={0.4}
            stroke="var(--color-brand)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
