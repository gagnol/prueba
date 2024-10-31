"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { editPeriodista } from "@/lib/action"; // Asegúrate de tener esta función en el backend.

interface EditPeriodistaProps {
  user: any; // Cambia `any` al tipo de datos específico si es necesario.
  periodista: any; // Datos del periodista recibidos desde el componente padre.
}

export default function EditPeriodista({ user, periodista }: EditPeriodistaProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(periodista.topics || []);
  const [selectedMediaType, setSelectedMediaType] = useState<string>(periodista.mediaType || "");

  useEffect(() => {
    setSelectedTopics(periodista.topics || []);
    setSelectedMediaType(periodista.mediaType || "");
  }, [periodista]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.append("topics", JSON.stringify(selectedTopics));
    formData.append("mediaType", selectedMediaType);

    const res = await editPeriodista(periodista._id, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Editar Periodista
      </motion.h1>

      {periodista ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle>Editar Información</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={periodista.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico (no editable)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user.email} // Email viene del usuario padre.
                    readOnly
                    className="bg-gray-100 cursor-not-allowed" // Estilo para indicar que no es editable.
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topics">Temáticas</Label>
                  <Select
                    onValueChange={(value) =>
                      setSelectedTopics([...selectedTopics, value])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar temáticas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="politica">Política</SelectItem>
                      <SelectItem value="economia">Economía</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="cultura">Cultura</SelectItem>
                      <SelectItem value="deportes">Deportes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mediaName">Nombre del medio</Label>
                  <Input
                    id="mediaName"
                    name="mediaName"
                    defaultValue={periodista.mediaName}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mediaType">Tipo de medio</Label>
                  <Select
                    onValueChange={(value) => setSelectedMediaType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de medio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prensa">Prensa</SelectItem>
                      <SelectItem value="television">Televisión</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={periodista.location}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía breve</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={periodista.bio}
                  />
                </div>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <p className="text-center text-red-500 mt-8">Periodista no registrado</p>
      )}
    </div>
  );
}
