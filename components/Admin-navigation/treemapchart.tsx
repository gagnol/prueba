"use client";
import ReactApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const TreeMap = ({productsData}:any

) => {
	const options: ApexOptions = {
		chart: {
			toolbar: {
				show: false,
			},
		},
		colors: ["#8861F3"],
		dataLabels: {
			enabled: true,
			style: {
				fontSize: "15px",
			},
			formatter: (text, op): any => {
				return [text, `${op.value}%`];
			},
		},
	};

	const series = [
		{
		  data: productsData.map((item: any) => ({
			x: item.category, // assuming category is the field for the X axis
			y: parseFloat(item.location), // assuming percentage is the value
		  })),
		},
	  ];

	return (
		<div className="h-[350px] m-5 mr-0 mb-8 mt-2">
			<ReactApexCharts
				options={options}
				series={series}
				type="treemap"
				width="100%"
				height="100%"
			/>
		</div>
	);
};

export default TreeMap;
