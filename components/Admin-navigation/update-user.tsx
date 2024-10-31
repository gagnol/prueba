"use client"
import { updateUser } from '@/lib/user-action';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from 'react-hot-toast';
import { useFormState, useFormStatus } from 'react-dom';
import { useSelector } from 'react-redux';

interface UpdateFormProps {
  _id: string; // Receiving _id from parent
  name: string;
  email: string;
}

export default function UpdateForm({ _id, name, email }: UpdateFormProps) {
  const [state, formAction] = useFormState(updateUser, { message: '' });
  const { pending } = useFormStatus();
  const { userInfo } = useSelector((state: any) => state.next);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      formData.append("_id", _id); // Ensure _id is part of formData
      const res = await updateUser(_id, formData); // Pass _id to the API call

      toast.success(res.message, { duration: 4000, position: "top-center" });
    } catch (error) {
      toast.error("Error al actualizar la información.");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 mt-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Actualizar Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleFormSubmit(formData);
          }}
          className="grid gap-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" name="name" defaultValue={name} required />
            </div>
            <div>
              <Input type="hidden" id="email" name="email" defaultValue={email} />
              <Label htmlFor="password">
                Nueva Contraseña <span className="text-red-600">* opcional</span>
              </Label>
              <Input type="password" id="password" name="password" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                name="address"
                defaultValue={userInfo?.user.address}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                name="city"
                defaultValue={userInfo?.user.city}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postal">Código Postal</Label>
              <Input
                id="postal"
                name="postal"
                defaultValue={userInfo?.user.postal}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                name="country"
                defaultValue={userInfo?.user.country}
                required
              />
            </div>
          </div>

          <Button size="lg" type="submit" disabled={pending}>
            {pending ? "Actualizando..." : "Actualizar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
