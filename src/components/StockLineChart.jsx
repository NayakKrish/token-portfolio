import React from "react";
import { LineChart, Line } from "recharts";

const data = [
  { value: 120 },
  { value: 130 },
  { value: 110 },
  { value: 160 },
  { value: 125 },
  { value: 180 },
  { value: 140 },
  { value: 170 },
  { value: 150 },
  { value: 165 },
  { value: 120 },
  { value: 130 },
  { value: 110 },
  { value: 160 },
  { value: 125 },
  { value: 180 },
  { value: 140 },
  { value: 170 },
  { value: 150 },
  { value: 165 },
  { value: 120 },
  { value: 130 },
  { value: 110 },
  { value: 160 },
  { value: 125 },
  { value: 180 },
  { value: 140 },
  { value: 170 },
  { value: 150 },
  { value: 165 },
  { value: 120 },
  { value: 130 },
  { value: 110 },
  { value: 160 },
  { value: 125 },
  { value: 180 },
  { value: 140 },
  { value: 170 },
  { value: 150 },
  { value: 165 },
  { value: 120 },
  { value: 130 },
  { value: 110 },
  { value: 160 },
  { value: 125 },
  { value: 180 },
  { value: 140 },
  { value: 170 },
  { value: 150 },
  { value: 165 },
];

export default function StockLikeChart() {
  return (
    <LineChart data={data} width={100} height={50}>
      <Line
        type="linear"
        dataKey="value"
        stroke="#00ff66"
        strokeWidth={1}
        dot={false}
        isAnimationActive={false}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        activeDot={false}
      />
    </LineChart>
  );
}
