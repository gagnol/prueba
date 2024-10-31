import React from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';
import Stars from './Stars';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'; // Asegúrate de que esta ruta sea correcta

function Reviews({ item }: any) {
  return (
    <Card key={item._id} className="shadow-lg mx-5 my-3">
      <CardHeader className="flex items-center space-x-3">
        {item.avatar ? (
          <Button variant="ghost" className="p-0">
            <Image
              src={item.avatar}
              alt="Avatar"
              width={50}
              height={50}
              className="w-11 h-11 rounded-full object-cover"
            />
            <span className="ml-3 font-semibold">{item.name}</span>
          </Button>
        ) : (
          <User className="w-11 h-11 text-gray-500" />
        )}
      </CardHeader>

      <CardContent>
        <div className="flex items-center mb-2">
          <Stars value={item.rating} />
          <h4 className="ml-2 font-bold">{item.subject}</h4>
        </div>
        <CardDescription className="text-primary">
          Enviado el{' '}
          {new Date(item.createdAt.substring(0, 10)).toLocaleDateString(
            'es-ES',
            { year: 'numeric', month: 'long', day: 'numeric' }
          )}
        </CardDescription>
        <p className="mt-2">{item.review}</p>
      </CardContent>

      <CardFooter>
        <Separator />
      </CardFooter>
    </Card>
  );
}

export default Reviews;
