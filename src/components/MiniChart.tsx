import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { mockChartData } from "@/utils/mockData";

export const MiniChart = () => {
  return (
    <div className="w-full h-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.9)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontSize: "12px",
            }}
            formatter={(v: number) => [`${(v / 1000).toFixed(0)}k FCFA`]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#chartGradLine)"
            strokeWidth={2.5}
            fill="url(#chartGrad)"
          />
          <defs>
            <linearGradient id="chartGradLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
