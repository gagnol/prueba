import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function CardHeaders({
	Icon,
	title,
	count,
	countSymbol,
	withSymbol,
}: {
	Icon: JSX.Element;
	title: string;
	description: string;
	count: number;
	countSymbol: string;
	withSymbol?: boolean;
}) {
	return (
		<Card className="w-full border-0 shadow-xl py-2">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-[#8A8A8A]">
					{title}
				</CardTitle>
			        {Icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-[700] text-blue-700">
					{withSymbol && countSymbol } {count}
				</div>
			
			</CardContent>
		</Card>
	);
}
