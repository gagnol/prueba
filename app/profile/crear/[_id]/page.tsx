import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/Pressrelease-model";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Reviews from "@/components/Upgrade/reviews";
import ProgressBar from "@/components/Upgrade/progressbar";
import Stars from "@/components/Upgrade/Stars";
import ReviewForm from "@/components/Upgrade/reviewForm";
import { getServerSession } from "next-auth";
import SubmitLikes from "@/components/Upgrade/likesButton";
import SocialShare from "@/components/Upgrade/socialSharing";

// Interface del tipo de pedido (opcional si ya está definida en otro archivo)
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
  reviews: Array<{ rating: number; createdAt: string }>;
}

// Función para calcular el total de comentarios y porcentajes por calificación
function getTotalReviews(reviews: any[]) {
  const total = reviews.length;
  const distribution: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };

  reviews.forEach((review) => {
    const rating = review.rating.toString();
    distribution[rating] = (distribution[rating] || 0) + 1;
  });

  const percentages = Object.entries(distribution).map(([key, value]) => ({
    rating: key,
    percentage: (value / total) * 100,
  }));

  return { total, percentages };
}

export default async function OrderPage({ params }: { params: { _id: string } }) {
  const _id = params._id;

  await dbConnect();
  const orderDocs = await OrderModel.findOne({ _id });
  const order = JSON.parse(JSON.stringify(orderDocs));
  const session = await getServerSession();

  const { total, percentages } = getTotalReviews(order.reviews || []);

  // Construir URL dinámica para compartir
  const shareUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/crear/${order._id}`;

  return (
    <div className="min-w-full mx-auto p-6 my-4">
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {order.image && (
            <div className="relative lg:col-span-3 w-full h-72">
              <Image
                src={order.image}
                alt="Imagen del comunicado"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}

          <div className="flex flex-col justify-center space-y-4 lg:col-span-7">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">{order.title}</CardTitle>
              <CardDescription className="text-lg text-gray-500">
                Publicado el {new Date(order.createdAt).toLocaleDateString("es-ES")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700">{order.content}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="text-sm py-2 px-3">{order.mediaType}</Badge>
                <Badge className="text-sm py-2 px-3">{order.topic}</Badge>
                <Badge className="text-sm py-2 px-3">{order.location}</Badge>
                <Badge className="text-sm py-2 px-3">{order.reach}</Badge>
              </div>

              {order.distributionDate && (
                <p className="text-sm text-gray-500">
                  Fecha de distribución: {new Date(order.distributionDate).toLocaleDateString("es-ES")}
                </p>
              )}

              <p className="text-lg text-gray-500 my-6">Publicado por: {order.email}</p>
            </CardContent>

            
          </div>
        </div>
      </Card>

      {/****************** REVIEWS ****************/}
      <div className="my-5">
        <div className="flex flex-wrap justify-between mx-10">
          <h1 className="my-2">
            <strong>Comentarios</strong>
          </h1>
          <SubmitLikes order={order} />

          <SocialShare
            url={shareUrl}
            title={order.title} shareCount={0}          />
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-10 px-10 py-5">
          <div className="col-span-1 md:col-span-3">
            <div className="flex items-center">
              <Stars value={order.rating} />
              <h1 className="px-2">
                {order.rating ? `${order.rating} de 5` : "No hay revisiones para este comunicado"}
              </h1>
            </div>

            <h2>{total} Comentarios</h2>

            <div className="border-[2px] rounded-lg p-2 my-5">
              {total > 0 ? (
                percentages.map((item) => (
                  <div key={item.rating}>
                    <ProgressBar item={item.rating} value={item.percentage} />
                  </div>
                ))
              ) : (
                <p>Este comunicado no tiene comentarios</p>
              )}
            </div>

            {session ? (
              <ReviewForm session={session} order={order} />
            ) : (
              <div className="block">
                <p>Comentá sobre este comunicado</p>
                <p className="text-[14px] my-2">Compartí con otros usuarios</p>
                <Link href={`/signin?redirect=/order/${order._id}`}>
                  <button className="my-[15px] p-1 w-[50%] btn btn-primary btn-outline">
                    Escribí tu comentario
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="col-span-1 md:col-span-7">
            {order.reviews
              ?.sort(
                (a: any, b: any) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )
              .slice(0, 10)
              .map((item: any) => (
                <div key={item._id}>
                  <Reviews item={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
