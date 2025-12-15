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

interface CRASDistributionChartProps {
  data: Record<string, number>;
}

export function CRASDistributionChart({ data }: CRASDistributionChartProps) {
  const chartData = Object.entries(data)
    .map(([cras, count]) => ({
      cras: cras.replace("CRAS ", ""),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Cobertura por CRAS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="cras"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "white" }}
            />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
              formatter={value => `${value} beneficiários`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            />
            <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
