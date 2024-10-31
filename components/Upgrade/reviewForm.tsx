'use client'
import { updateReview } from '@/lib/user-action';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Stars from './Stars';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button'; // Assuming Button from ShadCN
import { Textarea } from '../ui/textarea'; // Assuming Textarea from ShadCN
import { Input } from '../ui/input'; // Assuming Input field from ShadCN


export default function ReviewForm({ session, order }: any) {
  const [rating, setRating] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pending, setPending] = useState(false); // Local state to manage submission

  const handleRatingChange = (value: number) => setRating(value);

  const handleSubmit = async (formData: FormData) => {
    setPending(true);
    const res = await updateReview(null, formData);
    toast.success(res.message, { duration: 4000, position: 'top-center' });
    setIsDialogOpen(false); // Close dialog on submission
    setPending(false);
  };

  return (
    <div className="py-5">
      <p>Calificá este comunicado</p>
      <p className="text-sm my-2">
        Compartí tus opiniones con otros comunicadores.
      </p>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(true)}>
            Calificar comunicado
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[450px]">
          <DialogTitle>Compartí tus opiniones</DialogTitle>
          <DialogDescription className="mb-4">
          Comparte tus opiniones con otros clientes.
          </DialogDescription>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              await handleSubmit(formData);
            }}
          >
            <label className="block mb-2">
              <span className="font-bold">Asunto</span>
              <Input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1"
                autoComplete="off"
              />
            </label>
 <input type="hidden" id="orderId" name="orderId" defaultValue={order._id} />
            <input type="hidden" id="email" name="email" defaultValue={session?.user?.email} />
            <input type="hidden" id="name" name="name" defaultValue={session?.user?.name} />
            <input type="hidden" id="avatar" name="avatar" defaultValue={session?.user?.image} />
            <label className="block mb-2">
              <span className="font-bold">Tús Comentarios</span>
              <Textarea
                id="review"
                name="review"
                required
                className="mt-1"
                autoComplete="off"
              />
            </label>

            <div className="form-control w-full max-w-xs py-4">
              <h3>
              Tu calificación</h3>
              <Stars value={rating || 0} />
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} htmlFor={`rating_${value}`} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating_${value}`}
                      name="rating"
                      value={value}
                      checked={rating === value}
                      onChange={() => handleRatingChange(value)}
                      className="mr-1"
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>

            <div className="justify-end flex flex-wrap mt-4">
              <Button type="submit"  disabled={pending}>
                {pending ? 'Enviando...' : 'Enviá tu comentario'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
