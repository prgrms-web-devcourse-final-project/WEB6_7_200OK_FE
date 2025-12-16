"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart/chart";

export const description = "A simple area chart";

const chartData = [
  { price: "120000", watch: 186 },
  { price: "130000", watch: 305 },
  { price: "140000", watch: 237 },
  { price: "150000", watch: 73 },
  { price: "160000", watch: 209 },
  { price: "170000", watch: 214 },
  { price: "180000", watch: 73 },
  { price: "190000", watch: 209 },
  { price: "200000", watch: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-brand)",
  },
} satisfies ChartConfig;

export default function ProductLogChart() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-medium">관심도</h3>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 0,
            right: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="price"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="watch"
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
