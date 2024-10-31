"use client";
import { ResponsiveChoropleth } from "@nivo/geo";
import countriesfeatures from "./worldcountries.json";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const GeoMap = () => {
	const data = [
		{
			id: "AFG",
			value: 63874,
		},
		{
			id: "AGO",
			value: 393964,
		},
		{
			id: "ALB",
			value: 766515,
		},
		{
			id: "ARE",
			value: 950842,
		},
		{
			id: "ARG",
			value: 466383,
		},
		{
			id: "ARM",
			value: 817004,
		},
		{
			id: "ATA",
			value: 277155,
		},
		{
			id: "ATF",
			value: 286386,
		},
		{
			id: "AUT",
			value: 205468,
		},
		{
			id: "AZE",
			value: 877284,
		},
		{
			id: "BDI",
			value: 56247,
		},
		{
			id: "BEL",
			value: 752323,
		},
		{
			id: "BEN",
			value: 428176,
		},
		{
			id: "BFA",
			value: 481841,
		},
		{
			id: "BGD",
			value: 16009,
		},
		{
			id: "BGR",
			value: 909944,
		},
		{
			id: "BHS",
			value: 181347,
		},
		{
			id: "BIH",
			value: 123798,
		},
		{
			id: "BLR",
			value: 134346,
		},
		{
			id: "BLZ",
			value: 710862,
		},
		{
			id: "BOL",
			value: 106539,
		},
		{
			id: "BRN",
			value: 827354,
		},
		{
			id: "BTN",
			value: 727057,
		},
		{
			id: "BWA",
			value: 123800,
		},
		{
			id: "CAF",
			value: 815206,
		},
		{
			id: "CAN",
			value: 404364,
		},
		{
			id: "CHE",
			value: 104616,
		},
		{
			id: "CHL",
			value: 818627,
		},
		{
			id: "CHN",
			value: 4529,
		},
		{
			id: "CIV",
			value: 309409,
		},
		{
			id: "CMR",
			value: 532363,
		},
		{
			id: "COG",
			value: 537615,
		},
		{
			id: "COL",
			value: 498431,
		},
		{
			id: "CRI",
			value: 871724,
		},
		{
			id: "CUB",
			value: 10375,
		},
		{
			id: "-99",
			value: 8699,
		},
		{
			id: "CYP",
			value: 702168,
		},
		{
			id: "CZE",
			value: 662629,
		},
		{
			id: "DEU",
			value: 948242,
		},
		{
			id: "DJI",
			value: 205589,
		},
		{
			id: "DNK",
			value: 848786,
		},
		{
			id: "DOM",
			value: 808612,
		},
		{
			id: "DZA",
			value: 667456,
		},
		{
			id: "ECU",
			value: 418579,
		},
		{
			id: "EGY",
			value: 471545,
		},
		{
			id: "ERI",
			value: 284457,
		},
		{
			id: "ESP",
			value: 509162,
		},
		{
			id: "EST",
			value: 306183,
		},
		{
			id: "ETH",
			value: 791839,
		},
		{
			id: "FIN",
			value: 671764,
		},
		{
			id: "FJI",
			value: 735232,
		},
		{
			id: "FLK",
			value: 579204,
		},
		{
			id: "FRA",
			value: 849077,
		},
		{
			id: "GAB",
			value: 701012,
		},
		{
			id: "GBR",
			value: 93464,
		},
		{
			id: "GEO",
			value: 935467,
		},
		{
			id: "GHA",
			value: 941301,
		},
		{
			id: "GIN",
			value: 440724,
		},
		{
			id: "GMB",
			value: 825806,
		},
		{
			id: "GNB",
			value: 702467,
		},
		{
			id: "GNQ",
			value: 328460,
		},
		{
			id: "GRC",
			value: 135092,
		},
		{
			id: "GTM",
			value: 741527,
		},
		{
			id: "GUY",
			value: 537539,
		},
		{
			id: "HND",
			value: 541162,
		},
		{
			id: "HRV",
			value: 505152,
		},
		{
			id: "HTI",
			value: 909300,
		},
		{
			id: "HUN",
			value: 624984,
		},
		{
			id: "IDN",
			value: 280876,
		},
		{
			id: "IND",
			value: 10919,
		},
		{
			id: "IRL",
			value: 887408,
		},
		{
			id: "IRN",
			value: 600258,
		},
		{
			id: "IRQ",
			value: 711089,
		},
		{
			id: "ISL",
			value: 272433,
		},
		{
			id: "ISR",
			value: 685534,
		},
		{
			id: "ITA",
			value: 579200,
		},
		{
			id: "JAM",
			value: 486155,
		},
		{
			id: "JOR",
			value: 331411,
		},
		{
			id: "JPN",
			value: 419472,
		},
		{
			id: "KAZ",
			value: 207520,
		},
		{
			id: "KEN",
			value: 86888,
		},
		{
			id: "KGZ",
			value: 751110,
		},
		{
			id: "KHM",
			value: 217559,
		},
		{
			id: "OSA",
			value: 687816,
		},
		{
			id: "KWT",
			value: 618652,
		},
		{
			id: "LAO",
			value: 202393,
		},
		{
			id: "LBN",
			value: 307771,
		},
		{
			id: "LBR",
			value: 198164,
		},
		{
			id: "LBY",
			value: 615724,
		},
		{
			id: "LKA",
			value: 98705,
		},
		{
			id: "LSO",
			value: 509622,
		},
		{
			id: "LTU",
			value: 593363,
		},
		{
			id: "LUX",
			value: 551932,
		},
		{
			id: "LVA",
			value: 959394,
		},
		{
			id: "MAR",
			value: 70965,
		},
		{
			id: "MDA",
			value: 330927,
		},
		{
			id: "MDG",
			value: 259376,
		},
		{
			id: "MEX",
			value: 269309,
		},
		{
			id: "MKD",
			value: 995662,
		},
		{
			id: "MLI",
			value: 891991,
		},
		{
			id: "MMR",
			value: 534167,
		},
		{
			id: "MNE",
			value: 261316,
		},
		{
			id: "MNG",
			value: 95150,
		},
		{
			id: "MOZ",
			value: 793621,
		},
		{
			id: "MRT",
			value: 236492,
		},
		{
			id: "MWI",
			value: 170628,
		},
		{
			id: "MYS",
			value: 872847,
		},
		{
			id: "NAM",
			value: 784314,
		},
		{
			id: "NCL",
			value: 453422,
		},
		{
			id: "NER",
			value: 636250,
		},
		{
			id: "NGA",
			value: 184191,
		},
		{
			id: "NIC",
			value: 830842,
		},
		{
			id: "NLD",
			value: 691122,
		},
		{
			id: "NOR",
			value: 63297,
		},
		{
			id: "NPL",
			value: 511732,
		},
		{
			id: "NZL",
			value: 50020,
		},
		{
			id: "OMN",
			value: 536736,
		},
		{
			id: "PAK",
			value: 1816,
		},
		{
			id: "PAN",
			value: 522312,
		},
		{
			id: "PER",
			value: 620298,
		},
		{
			id: "PHL",
			value: 757006,
		},
		{
			id: "PNG",
			value: 758579,
		},
		{
			id: "POL",
			value: 553519,
		},
		{
			id: "PRI",
			value: 543098,
		},
		{
			id: "PRT",
			value: 858801,
		},
		{
			id: "PRY",
			value: 343278,
		},
		{
			id: "QAT",
			value: 692370,
		},
		{
			id: "ROU",
			value: 43630,
		},
		{
			id: "RUS",
			value: 452684,
		},
		{
			id: "RWA",
			value: 411098,
		},
		{
			id: "ESH",
			value: 122713,
		},
		{
			id: "SAU",
			value: 418837,
		},
		{
			id: "SDN",
			value: 556043,
		},
		{
			id: "SDS",
			value: 996905,
		},
		{
			id: "SEN",
			value: 920913,
		},
		{
			id: "SLB",
			value: 438947,
		},
		{
			id: "SLE",
			value: 494607,
		},
		{
			id: "SLV",
			value: 252142,
		},
		{
			id: "ABV",
			value: 166980,
		},
		{
			id: "SOM",
			value: 137616,
		},
		{
			id: "SRB",
			value: 243051,
		},
		{
			id: "SUR",
			value: 681761,
		},
		{
			id: "SVK",
			value: 967598,
		},
		{
			id: "SVN",
			value: 160167,
		},
		{
			id: "SWZ",
			value: 258481,
		},
		{
			id: "SYR",
			value: 426440,
		},
		{
			id: "TCD",
			value: 75723,
		},
		{
			id: "TGO",
			value: 294740,
		},
		{
			id: "THA",
			value: 35157,
		},
		{
			id: "TJK",
			value: 105449,
		},
		{
			id: "TKM",
			value: 757866,
		},
		{
			id: "TLS",
			value: 874017,
		},
		{
			id: "TTO",
			value: 181590,
		},
		{
			id: "TUN",
			value: 659062,
		},
		{
			id: "TUR",
			value: 666295,
		},
		{
			id: "TWN",
			value: 910592,
		},
		{
			id: "TZA",
			value: 979302,
		},
		{
			id: "UGA",
			value: 270147,
		},
		{
			id: "UKR",
			value: 858969,
		},
		{
			id: "URY",
			value: 420277,
		},
		{
			id: "USA",
			value: 944065,
		},
		{
			id: "UZB",
			value: 280303,
		},
		{
			id: "VEN",
			value: 822587,
		},
		{
			id: "VNM",
			value: 8100,
		},
		{
			id: "VUT",
			value: 749876,
		},
		{
			id: "PSE",
			value: 990241,
		},
		{
			id: "YEM",
			value: 738819,
		},
		{
			id: "ZAF",
			value: 436559,
		},
		{
			id: "ZMB",
			value: 43969,
		},
		{
			id: "ZWE",
			value: 934044,
		},
		{
			id: "KOR",
			value: 241028,
		},
	];
	return (
		<div className="h-[350px] w-full bg-white rounded-[12px]">
			<ResponsiveChoropleth
				data={data}
				features={countriesfeatures.features}
				// features={countriesfeatures.features?.map((i) => ({ ...i, id: i?.properties.name }))}
				margin={{ top: 20, bottom: 30, right: 40, left: 15 }}
				colors="greys"
				domain={[0, 1000000]}
				unknownColor="#d3c5c5"
				label="properties.name"
				valueFormat=".2s"
				projectionTranslation={[0.5, 0.5]}
				projectionRotation={[0, 0, 0]}
				enableGraticule={true}
				graticuleLineWidth={0}
				graticuleLineColor="#dddddd"
				borderWidth={1}
				legends={[
					{
						anchor: "bottom-left",
						direction: "column",
						justify: true,
						translateX: 20,
						translateY: -100,
						itemsSpacing: 0,
						itemWidth: 94,
						itemHeight: 18,
						itemDirection: "left-to-right",
						itemTextColor: "#444444",
						itemOpacity: 0.85,
						symbolSize: 18,
						effects: [
							{
								on: "hover",
								style: {
									itemTextColor: "#000000",
									itemOpacity: 1,
								},
							},
						],
					},
				]}
			/>
		</div>
	);
};

export default GeoMap;
