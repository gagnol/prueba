// ContactForm.tsx
'use client';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '@/components/ui/button';

// Schema de validación Zod
const contactSchema = z.object({
  subject: z.string().min(3, 'El asunto debe tener al menos 3 caracteres.'),
  email: z.string().email('El email no es válido.'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  userEmail: string; // Pasamos el email del usuario como prop desde el servidor
}

export default function ContactForm({ userEmail }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: userEmail },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario.');
      }
      toast.success('Formulario enviado con éxito.');
    } catch (error) {
      toast.error('Hubo un error. Inténtalo de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium">Asunto</label>
        <Input
          id="subject"
          {...register('subject')}
          placeholder="Escribe el asunto"
        />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <Input
          id="email"
          {...register('email')}
          disabled
          className="bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="description" 
        className="block text-sm font-medium">
            Descripción
        </label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Describe tu problema o consulta"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
