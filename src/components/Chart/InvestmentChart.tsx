"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { InvestmentResult } from "@/utils/investment";

interface ChartProps {
  data: InvestmentResult[];
}

export default function InvestmentChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="totalInvested" stroke="#8884d8" fill="#8884d8" name="Investido" />
        <Area type="monotone" dataKey="totalAccumulated" stroke="#82ca9d" fill="#82ca9d" name="Acumulado" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
