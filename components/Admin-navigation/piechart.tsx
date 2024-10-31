"use client";
import { FC } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Escala de colores índigo y gris
const COLORS = [
  "#4B0082", // Índigo profundo
  "#5A4FCF", // Índigo medio
  "#7B68EE", // Índigo claro
  "#B0C4DE", // Gris claro azulado
  "#D3D3D3", // Gris claro
];

const PieChartComponent: FC<{ data: { name: string; value: number }[] }> = ({
  data,
}) => {
  return (
    <div className="h-[350px] w-full bg-white rounded-[12px]">
      <h2 className="text-[#8A8A8A] text-[18px] font-[400] p-5 pt-7 pl-8">
        Comunicados por Tema
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
