import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
}

export function KPICard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: KPICardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground text-white">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary text-white" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground text-white">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 text-white">
            {description}
          </p>
        )}
        {trend && (
          <div
            className={`text-xs mt-2 font-semibold ${
              trend.direction === "up"
                ? "text-green-600"
                : trend.direction === "down"
                  ? "text-red-600"
                  : "text-gray-600"
            }`}
          >
            {trend.direction === "up"
              ? "↑"
              : trend.direction === "down"
                ? "↓"
                : "→"}{" "}
            {trend.value}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}
