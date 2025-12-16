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
  data: Record<string, Record<string, number>>;
}

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  const allIdades = new Set<string>();

  console.log("teste: ", data);

  Object.values(data).forEach(sexData => {
    Object.keys(sexData).forEach(age => {
      allIdades.add(age);
    });
  });

  const chartData = Array.from(allIdades)
    .map(idade => ({
      idade: idade,
      fullName: idade,
      Masculino: data.Masculino?.[idade] || 0,
      Feminino: data.Feminino?.[idade] || 0,
    }))
    .filter(item => item.Masculino > 0 || item.Feminino > 0);
  // .sort((a, b) => b.Masculino + b.Feminino - (a.Masculino + a.Feminino));

  // const chartData = Object.entries(data)
  //   .map(([age, count]) => ({
  //     age: `${age} anos`,
  //     count,
  //   }))
  //   .sort((a, b) => parseInt(a.age) - parseInt(b.age));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // payload[0].payload contém os dados completos do ponto (Masculino, Feminino, idade)
      const dataItem = payload[0].payload;
      const masculino = dataItem.Masculino || 0;
      const feminino = dataItem.Feminino || 0;
      const total = masculino + feminino;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
            color: "#000",
          }}
        >
          {/* <p
            className="label"
            style={{ fontWeight: "bold" }}
          >{`Idade: ${label}`}</p> */}
          <p
            className="intro"
            style={{ color: "#3b82f6" }}
          >{`Masculino: ${masculino} ${masculino == 1 ? "beneficiário" : "beneficiários"}`}</p>
          <p
            className="intro"
            style={{ color: "#ec4899" }}
          >{`Feminino: ${feminino} ${feminino == 1 ? "beneficiário" : "beneficiários"}`}</p>
          <p
            className="total"
            style={{
              color: "#585858",
              marginTop: "5px",
              borderTop: "1px solid #eee",
              paddingTop: "5px",
              fontWeight: "bold",
            }}
          >
            {`TOTAL: ${total} beneficiários`}
          </p>
        </div>
      );
    }

    return null;
  };

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
              dataKey="idade"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "white" }}
              label={"Idade"}
            />
            <YAxis tick={{ fill: "white" }} type="number" />
            <Tooltip content={<CustomTooltip />} />

            {/* Adicionando a Legenda */}
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Bar dataKey="Masculino" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="Feminino" fill="#ec4899" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
