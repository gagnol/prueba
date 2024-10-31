"use client";
import { FC } from "react";
import {
	Bar,
	BarChart,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const Barchat: FC<{ data: { name: string; comunicados: number }[] }> = ({ data }) => {
	// Componente personalizado para el eje X
	const CustomizedAxisTick = (tick: any) => {
		const { x, y, payload } = tick;
		return (
			<g transform={`translate(${x},${y})`}>
				<text
					x={0}
					y={0}
					dy={16}
					textAnchor="end"
					fill="#BFBFBF"
					transform="rotate(-35)"
					fontSize={12}
				>
					{payload.value}
				</text>
			</g>
		);
	};

	return (
		<div className="h-[350px] w-full bg-white rounded-[12px]">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					margin={{ top: 10, bottom: 30, right: 40, left: 15 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						tick={CustomizedAxisTick}
						stroke="#BFBFBF"
						interval={0}
					/>
					<YAxis
						tick={{ fill: "#BFBFBF", fontSize: "14px" }}
						tickFormatter={(value) =>
							new Intl.NumberFormat("es-ES", {
								notation: "compact",
								compactDisplay: "short",
							}).format(value)
						}
						stroke="#BFBFBF"
					/>
					<Tooltip cursor={{ fill: "transparent" }} />
					<Bar
						dataKey="comunicados" 
						fill="#5A4FCF"
						barSize={26}
						radius={[7, 7, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Barchat;
