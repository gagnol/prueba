

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import Comunicacion from "@/components/User-navigation/comunicacion"
import SliderModel from '@/lib/slider-model';

export default async function ProfileScreen() {

    const session = await getServerSession();

    if (!session?.user) {
        redirect("/signin")
    }

    await dbConnect();
    const productsDocs = await SliderModel.find().sort({ _id: -1 });
    const product = JSON.parse(JSON.stringify(productsDocs));

    return (
      <div>
        <Comunicacion product={product}/>
      </div>
    );
}


