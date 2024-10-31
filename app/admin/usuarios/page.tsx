import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from "@/lib/db-connect";
import Usuarios from "@/components/Admin-navigation/usuarios"
import UserModel from '@/lib/user-model';

export default async function UsersScreen() {
    const session = await getServerSession();

    if (session?.user?.email !== "admin@example.com") {
      redirect("/")
    }

    await dbConnect();
    const usersDocs = await UserModel.find().sort({ _id: -1 });
    const users = JSON.parse(JSON.stringify(usersDocs));

    return (
      <div>
        <Usuarios users={users}/>
      </div>
    );
}


