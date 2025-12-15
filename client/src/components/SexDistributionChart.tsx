import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface SexDistributionChartProps {
  data: Record<string, number>;
}

export function SexDistributionChart({ data }: SexDistributionChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    percentage: (
      (value / Object.values(data).reduce((a, b) => a + b, 0)) *
      100
    ).toFixed(1),
  }));

  const COLORS = ["#3b82f6", "#ec4899"];

  return (
    <Card className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Distribuição por Sexo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ cx, x, y, name, percentage }) => {
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#ffffff"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-xs font-medium"
                  >
                    {`${name} (${percentage}%)`}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={0} // Remove a borda branca padrão das fatias para ficar mais limpo
                />
              ))}
            </Pie>

            <Tooltip
              formatter={value => [`${value} beneficiários`]}
              contentStyle={{ borderRadius: "8px" }}
            />

            {/* Adicionei wrapperStyle para garantir que a legenda também fique branca */}
            <Legend wrapperStyle={{ color: "#ffffff" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
