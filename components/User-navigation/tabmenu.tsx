'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Props {}

const Tabmenu: FC<Props> = ({}) => {
	const pathname = usePathname();

	return (
		<div className="border-b-[1px] p-5 py-4 flex items-center gap-5 md:gap-10 lg:gap-16">
			<Link
				href="/profile/main"
				className={cn(
					"flex items-center py-2 text-muted-foreground/70 transition-all hover:text-primary text-[16px]",
					pathname === "/profile/main" &&
						"text-primary text-black font-[500] border-b-[#4B0082] border-b-[4px]"
				)}
			>
			Directorio General	
			</Link>
			<Link
				href="/profile/main/comunicados"
				className={cn(
					"flex items-center py-2 text-muted-foreground/70 transition-all hover:text-primary text-[16px]",
					pathname === "/profile/main/comunicados" &&
						"text-primary text-black font-[500] border-b-[#4B0082] border-b-[4px]"
				)}
			>
				Mis Comunicados
			</Link>
		</div>
	);
};




export default Tabmenu