import { Cell, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 500 },
  { name: "Group F", value: 200 },
];

const COLORS = [
  "#A78BFA",
  "#FB7185",
  "#10B981",
  "#60A5FA",
  "#18C9DD",
  "#FB923C",
  "#F59E0B",
  "#EC4899",
  "#8B5CF6",
  "#3B82F6",
  "#2563EB",
];

export default function DonutChart() {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        innerRadius={50}
        outerRadius={100}
        fill={"#A9E851"}
        dataKey="value"
        startAngle={90}
        endAngle={-270}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
