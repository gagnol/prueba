"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Trash2 } from "lucide-react";
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
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { deletePeriodista } from "@/lib/action";

// Función de eliminación
const handleDelete = async (id: string) => {
  const confirmed = confirm("Está seguro de borrar el comunicado?");
  if (!confirmed) return;

  const formData = new FormData();
  formData.append("_id", id);

  try {
    const res = await deletePeriodista(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setTimeout(() => {
      redirect("/admin/main");
    }, 2000);
  } catch (error) {
    toast.error("Error al eliminar el comunicado.");
  }
};

export default function Dashboard({ product }: any) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredProducts = product.filter((i: any) => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic ? JSON.parse(i.topics).includes(selectedTopic) : true;
    const matchesMediaType = selectedMediaType ? i.mediaType === selectedMediaType : true;
    const matchesLocation = selectedLocation ? i.location === selectedLocation : true;

    return matchesSearch && matchesTopic && matchesMediaType && matchesLocation;
  });

  const clearFilters = () => {
    setSelectedTopic("");
    setSelectedMediaType("");
    setSelectedLocation("");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Búsqueda de Periodistas
      </motion.h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Search className="text-muted-foreground" />
              <Input
                placeholder="Buscar periodistas..."
                className="flex-grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    isFiltersOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
            <motion.div
              initial={false}
              animate={{ height: isFiltersOpen ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Select onValueChange={setSelectedTopic} value={selectedTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Temática" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="politica">Política</SelectItem>
                    <SelectItem value="economia">Economía</SelectItem>
                    <SelectItem value="tecnologia">Tecnología</SelectItem>
                    <SelectItem value="cultura">Cultura</SelectItem>
                    <SelectItem value="deportes">Deportes</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedMediaType} value={selectedMediaType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de medio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prensa">Prensa</SelectItem>
                    <SelectItem value="television">Televisión</SelectItem>
                    <SelectItem value="radio">Radio</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedLocation} value={selectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Button onClick={clearFilters} variant="outline">
                  Borrar filtros
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((i: any) => (
              <Card key={i._id} className="relative">
                <CardHeader>
                  <CardTitle>Nombre del Periodista: {i.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Temáticas:</p>
                      {Array.isArray(JSON.parse(i.topics)) &&
                        JSON.parse(i.topics).map((topic: string, idx: number) => (
                          <p key={idx}>{topic}</p>
                        ))}
                    </div>
                    <div>
                      <p className="font-semibold">Nombre del medio:</p>
                      <p>{i.mediaName}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Tipo de medio:</p>
                      <p>{i.mediaType}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Ubicación:</p>
                      <p>{i.location}</p>
                    </div>
                  </div>
                </CardContent>
                <Trash2
                  className="absolute top-4 right-4 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(i._id)}
                />
              </Card>
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
