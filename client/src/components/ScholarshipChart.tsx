import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScholarshipChartProps {
  data: Record<string, number>;
}

export function ScholarshipChart({ data }: ScholarshipChartProps) {
  const chartData = Object.entries(data)
    .map(([level, count]) => ({
      level: level.length > 20 ? level.substring(0, 17) + "..." : level,
      fullLevel: level,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Distribuição por Escolaridade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tick={{ fill: "white" }} />
            <YAxis
              dataKey="level"
              type="category"
              width={190}
              tick={{ fill: "white" }}
            />
            <Tooltip
              formatter={value =>
                `${value} ${Number(value) < 2 ? "beneficiário" : "beneficiários"}`
              }
              labelFormatter={label => `Escolaridade: ${label}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            />
            <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
