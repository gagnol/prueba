
import Pressedit from "@/components/User-navigation/editmiscom";
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/Pressrelease-model";

interface PressRelease {
  _id: string;
  title: string;
  content: string;
  mediaType: string;
  topic: string;
  location: string;
  reach: string;
  distributionDate?: string;
  status: string;
  email: string;
  image?: string;
  createdAt: string;
}

export default async function orderPage({ params }: { params: { _id: string } }) {
  const _id = params._id;

  await dbConnect();
  const orderDocs = await OrderModel.findOne({ _id });
  const order: PressRelease = JSON.parse(JSON.stringify(orderDocs));
 
  return (
    <div className="min-w-full mx-auto p-6">
    <Pressedit order={order}/>
    </div>
  );
}

