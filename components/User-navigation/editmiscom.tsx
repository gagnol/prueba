"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, Toaster } from "react-hot-toast";
import { editComicacion } from "@/lib/action";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/User-navigation/UploadImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface PressRelease {
  _id: string; // Add _id to the interface
  title: string;
  content: string;
  mediaType: string;
  topic: string;
  location: string;
  reach: string;
  distributionDate?: string;
  email: string;
  image?: string;
  status:string
}

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

const topics = [
  "Política",
  "Economía",
  "Sociedad",
  "Internacionales",
  "Deportes",
  "Espectáculos",
  "Culturales",
  "Eventos",
];
export default function Pressedit({ order }: { order: PressRelease }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Initialize state with order's current values
  const [title, setTitle] = useState(order.title || "");
  const [content, setContent] = useState(order.content || "");
  const [mediaType, setMediaType] = useState(order.mediaType || "");
  const [topic, setTopic] = useState(order.topic || "");
  const [location, setLocation] = useState(order.location || "");
  const [reach, setReach] = useState(order.reach || "");
  const [distributionDate, setDistributionDate] = useState(order.distributionDate || "");
  const [image, setImage] = useState<string[]>(order.image ? [order.image] : []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(order.status || "");

  const handleImageChange = (url: string) => setImage([url]);
  const handleImageRemove = () => setImage([]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    // Append additional data
    formData.append("email", session?.user?.email || "");
    if (image.length > 0) formData.append("image", image[0]);
    formData.append("mediaType", mediaType);
    formData.append("topic", topic);
    formData.append("location", location);
    formData.append("reach", reach);
    formData.append("distributionDate", distributionDate);
    formData.append("status", status);
    const res = await editComicacion(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsSubmitting(false);

    setTimeout(() => {
      router.push("/profile/main");
    }, 2000);
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
          Editar Comunicado de Prensa
        </motion.h1>
        <div className="max-w-4xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="mr-2" />
                Editar Comunicado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  await handleSubmit(formData);
                }}
                className="space-y-4"
              >
                <input type="hidden" name="_id" value={order._id} /> {/* Hidden input for _id */}

                <div>
                  <h4>Imagen de portada</h4>
                  <ImageUpload value={image} onChange={handleImageChange} onRemove={handleImageRemove} />
                </div>

                <Input
                  name="title"
                  placeholder="Título del comunicado"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Textarea
                  name="content"
                  placeholder="Contenido del comunicado"
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />

                <Select value={mediaType} onValueChange={setMediaType} required>
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
               <Select onValueChange={setTopic} value={topic} required>
                <SelectTrigger>
                 <SelectValue placeholder="Tópico" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

                
        <Select onValueChange={setLocation} value={location} required>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una provincia" />
        </SelectTrigger>
        <SelectContent>
          {provinciasArgentinas.map((provincia) => (
            <SelectItem key={provincia} value={provincia}>
              {provincia}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

                 <Select value={reach} onValueChange={setReach} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Alcance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pequeno">Pequeño</SelectItem>
                    <SelectItem value="Mediano">Mediano</SelectItem>
                    <SelectItem value="Grande">Grande</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="datetime-local"
                  name="distributionDate"
                  value={distributionDate}
                  onChange={(e) => setDistributionDate(e.target.value)}
                />
          <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de envio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Borrador">Borrador</SelectItem>
                    <SelectItem value="scheduled">Programado</SelectItem>
                    <SelectItem value="Enviado">Enviar directamente</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar Cambios"}
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
