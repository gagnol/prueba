
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import PressModel from '@/lib/Pressrelease-model'
import Tabmenu from "@/components/User-navigation/tabmenu";
import Miscomunicaciones from "@/components/User-navigation/miscom";


export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
        redirect("/")
    }
	await dbConnect();
	const pressDocs = await PressModel.find({ email: session.user.email }).sort({ _id: -1 });
    const orders = JSON.parse(JSON.stringify(pressDocs));
    

    return (
      <div className="bg-[#F6F6F6] p-4 lg:gap-6 lg:p-6 h-full w-full">
		<main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px]">
		<Tabmenu/>
		<Miscomunicaciones orders={orders}/>
		</main>
		</div>
);
}


