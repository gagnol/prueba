"use client";
import { SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Save, Send } from "lucide-react"; // Importamos Save y Send
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "react-hot-toast";
import { nuevaComicacion } from "@/lib/action";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/User-navigation/UploadImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const provinciasArgentinas = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
  "Ciudad Autónoma de Buenos Aires" 
];



export default function PressReleaseDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mediaType, setMediaType] = useState("");
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");
  const [reach, setReach] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (url: string) => setImage([url]);
  const handleImageRemove = () => setImage([]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    // Adjunta los campos adicionales al FormData
    formData.append("email", session?.user?.email || "");
    if (image.length > 0) {
      formData.append("image", image[0]);
    }
    formData.append("mediaType", mediaType);
    formData.append("topic", topic);
    formData.append("location", location);
    formData.append("reach", reach);

    const res = await nuevaComicacion(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsSubmitting(false);

    setTimeout(() => {
      router.push("/profile/main");
    }, 2000);
  };

  const handleStatusSubmit = async (status: string) => {
    const form = document.querySelector("form") as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("status", status); // Añadimos el estado dinámicamente
    await handleSubmit(formData);
  };

  return (
    <div className="flex h-screen bg-background">
      <Toaster />
      <div className="flex-1 overflow-auto p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
          Creación y Distribución de Comunicados
        </motion.h1>
        <div className="max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="mr-2" />
                Crear Comunicado de Prensa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <h4>Imagen de portada</h4>
                  <ImageUpload
                    value={image}
                    onChange={handleImageChange}
                    onRemove={handleImageRemove}
                  />
                </div>
                <Input name="title" placeholder="Título del comunicado" required />
                <Textarea name="content" placeholder="Contenido del comunicado" rows={10} required />

                <Select onValueChange={(value: SetStateAction<string>) => setMediaType(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de medio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Prensa">Prensa</SelectItem>
                    <SelectItem value="Televisión">Televisión</SelectItem>
                    <SelectItem value="Radio">Radio</SelectItem>
                    <SelectItem value="Digital">Digital</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value: SetStateAction<string>) => setTopic(value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Temática" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Política">Política</SelectItem>
                    <SelectItem value="Economía">Economía</SelectItem>
                    <SelectItem value="Sociedad">Sociedad</SelectItem>
                    <SelectItem value="Internacionales">Internacionales</SelectItem>
                    <SelectItem value="Deportes">Deportes</SelectItem>
                    <SelectItem value="Espectáculos">Espectáculos</SelectItem>
                    <SelectItem value="Culturales">Culturales</SelectItem>
                    <SelectItem value="Eventos">Eventos</SelectItem>
                  </SelectContent>
                </Select>
  
  <Select onValueChange={(value) => setLocation(value)} required>
  <SelectTrigger>
    <SelectValue placeholder="Seleccionar provincia" />
  </SelectTrigger>
  <SelectContent>
    {provinciasArgentinas.map((provincia) => (
      <SelectItem key={provincia} value={provincia}>
        {provincia}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
 <Select onValueChange={(value: SetStateAction<string>) => setReach(value)} required>
           <SelectTrigger>
                <SelectValue placeholder="Alcance" />
                 </SelectTrigger>
                 <SelectContent>
                    <SelectItem value="Pequeno">Pequeño</SelectItem>
                    <SelectItem value="Mediano">Mediano</SelectItem>
                    <SelectItem value="Grande">Grande</SelectItem>
                  </SelectContent>
                </Select>
  <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => handleStatusSubmit("Borrador")}
                    disabled={isSubmitting}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Guardando..." : "Guardar como borrador"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleStatusSubmit("Enviado")}
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Enviando..." : "Enviar comunicado"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
