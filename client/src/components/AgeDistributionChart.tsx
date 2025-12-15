import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AgeDistributionChartProps {
  data: Record<string, number>;
}

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  const chartData = Object.entries(data)
    .map(([age, count]) => ({
      age: `${age} anos`,
      count,
    }))
    .sort((a, b) => parseInt(a.age) - parseInt(b.age));

  return (
    <Card className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Distribuição por Idade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
            <XAxis
              dataKey="age"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "white" }}
            />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
              formatter={value => `${value} participantes`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid white",
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
