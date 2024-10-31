"use client"

import { useState } from "react";
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
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { createComunicador } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function CommunicationRegistrationForm() {
  
  const router =useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to store selected values for 'Select' components
  const [sector, setSector] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    // Manually append the 'Select' values to the formData
    formData.append("sector", sector);
    formData.append("specialization", specialization);
    
    const res = await createComunicador(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsSubmitting(false);
    setTimeout(() => {
      router.push("/profile/main");
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-background p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Registro de Responsable de Comunicación y Prensa
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Alta</CardTitle>
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
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre del responsable"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Select
                  onValueChange={(value) => setSector(value)}
                  value={sector}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empresarial">Empresarial</SelectItem>
                    <SelectItem value="publico">Sector Público</SelectItem>
                    <SelectItem value="ong">ONG</SelectItem>
                    <SelectItem value="asociacion">Asociación Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Nombre de la organización</Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Nombre de la empresa/entidad"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Área de especialización</Label>
                <Select
                  onValueChange={(value) => setSpecialization(value)}
                  value={specialization}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar área de especialización" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporativa">
                      Comunicación Corporativa
                    </SelectItem>
                    <SelectItem value="crisis">Gestión de Crisis</SelectItem>
                    <SelectItem value="digital">
                      Comunicación Digital
                    </SelectItem>
                    <SelectItem value="rse">
                      Responsabilidad Social
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Años de experiencia</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  placeholder="Años de experiencia"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ciudad, País"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Perfil profesional</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Breve descripción de su experiencia y responsabilidades actuales"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Registrar Responsable"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
