'use client'
import { updateUser } from '@/lib/user-action'
import { Button} from "@/components/ui/button"
import {Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input} from "@/components/ui/input"
import toast from 'react-hot-toast'
import { useFormState, useFormStatus } from 'react-dom'
import { useSelector } from 'react-redux'

interface UpdateFormProps {
  session: any

}

export default function UpdateForm({ session }: UpdateFormProps) {
  const [state, formAction] = useFormState(updateUser, { message: '' })
  const { pending } = useFormStatus()
  const { userInfo } = useSelector((state: any) => state.next)

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const res = await updateUser(null, formData)
      toast.success(res.message, { duration: 4000, position: "top-center" })
    } catch (error) {
      toast.error("Error al actualizar la información.")
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 mt-8">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Actualizar Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleFormSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input 
                id="name" 
                name="name" 
                defaultValue={session?.user?.name} 
                required 
              />
            </div>
            <div>
              <Input 
                type="hidden" 
                id="email" 
                name="email" 
                defaultValue={session?.user?.email} 
              />
              <Label htmlFor="password">Nueva Contraseña<span className='text-red-600'>* opcional</span></Label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                required 
              />
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
  )
}
