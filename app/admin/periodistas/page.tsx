
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import Journalist from "@/components/Admin-navigation/journalist"
import PeriodistaModel from '@/lib/periodista-model';

export default async function PeriodistasScreen() {
        
  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/")
  }

    await dbConnect();
    const productsDocs = await PeriodistaModel.find().sort({ _id: -1 });
    const product = JSON.parse(JSON.stringify(productsDocs));
    
    return (
      <div>
        <Journalist product={product}/>
      </div>
    );
}


