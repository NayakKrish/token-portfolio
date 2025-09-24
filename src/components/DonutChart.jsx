import { Cell, Pie, PieChart } from "recharts";

const defaultData = [{ name: "No Holdings", value: 100, color: "#3F3F46" }];

export default function DonutChart({ data = defaultData }) {
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
            key={`cell-${entry.name}-${index}`}
            fill={entry.color || "#3F3F46"}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
