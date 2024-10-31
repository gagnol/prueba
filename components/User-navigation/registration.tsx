"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { createPeriodista } from "@/lib/action"
import { useRouter } from "next/navigation"

export default function RegistrationForm() {
const router =useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  // State to store selected values for 'Select' components
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedMediaType, setSelectedMediaType] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    formData.append('topics', JSON.stringify(selectedTopics)) // Store topics as a JSON string
    formData.append('mediaType', selectedMediaType)
    const res = await createPeriodista(null, formData)
    toast.success(res.message, { duration: 4000, position: "top-center" })
    setIsSubmitting(false)
    setTimeout(() => {
      router.push("/profile/main");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Registro de Periodista
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
  <Input id="name" name="name" 
  placeholder="Nombre del periodista" 
  required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
               <Input id="email" name="email" type="email" placeholder="correo@ejemplo.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topics">Temáticas</Label>
                <Select onValueChange={(value) => setSelectedTopics([...selectedTopics, value])}>
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
                <Input id="mediaName" name="mediaName" placeholder="Nombre del medio de comunicación" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mediaType">Tipo de medio</Label>
                <Select onValueChange={(value) => setSelectedMediaType(value)}>
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
                <Input id="location" name="location" placeholder="Ciudad, País" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía breve</Label>
                <Textarea id="bio" name="bio" placeholder="Breve descripción de la experiencia y especialización del periodista" />
              </div>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Registrar Periodista"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
