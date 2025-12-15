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

interface SexAllocationChartProps {
  data: Record<string, Record<string, number>>;
}

export function SexAllocationChart({ data }: SexAllocationChartProps) {
  // Processar dados para formato do gráfico
  const allSecretarias = new Set<string>();

  Object.values(data).forEach(sexData => {
    Object.keys(sexData).forEach(secretaria => {
      allSecretarias.add(secretaria);
    });
  });

  const chartData = Array.from(allSecretarias)
    .map(secretaria => ({
      secretaria:
        secretaria.length > 20
          ? secretaria
          : // ? secretaria.substring(0, 17) + "..."
            secretaria,
      fullName: secretaria,
      Masculino: data.Masculino?.[secretaria] || 0,
      Feminino: data.Feminino?.[secretaria] || 0,
    }))
    .filter(item => item.Masculino > 0 || item.Feminino > 0)
    .sort((a, b) => b.Masculino + b.Feminino - (a.Masculino + a.Feminino))
    .slice(0, 3);

  return (
    <Card className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Distribuição por Sexo e Alocação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tick={{ fill: "white" }} />
            <YAxis
              dataKey="secretaria"
              type="category"
              width={190}
              fontSize={12}
              tick={{ fill: "white" }}
            />
            <Tooltip
              formatter={value => `${value} beneficiários`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            />
            <Legend />
            <Bar dataKey="Masculino" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="Feminino" fill="#ec4899" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
