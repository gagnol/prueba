"use client";
import { FC, useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Edit, Eye, Filter, Search, Trash, X } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { subDays, subMonths, subYears, isAfter } from "date-fns";
import { deleteComicacion } from "@/lib/action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface Props {
  users: any[]; // Ajustar según el modelo de orden
}
// Delete handler function with FormData
const handleDelete = async (id: string) => {
  const confirmed = confirm("Está seguro de borrar el comunicado?");
  if (!confirmed) return;

  const formData = new FormData();
  formData.append("_id", id); // Add the item ID to the form data

  const res = await deleteComicacion(null, formData);
  toast.success(res.message, { duration: 4000, position: "top-center" });
    setTimeout(() => {
    redirect("/admin/main")
  }, 2000);
};

// Columnas para DataTable
export const usersColumn: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Portada</div>,
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt=""
        width={100}
        height={100}
        className="rounded-lg max-w-[100px] max-h-[100px] min-h-[100px]"
      />
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">
        Email
        </div>,
    cell: ({ row }) => (
      <div className="font-bold">
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Nombre</div>,
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
   
  {
    id: "edit",
    cell: ({ row }) => (
      <Link href={`/admin/usuarios/${row.original._id}`}>
        <Button variant="ghost" className="text-blue-500 hover:text-blue-700">
          <Edit size={24} />
        </Button>
      </Link>
    ),
},
  {
    id: "delete",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        className="text-red-500 hover:text-red-700"
        onClick={() => handleDelete(row.original._id)}
      >
        <Trash size={24} />
      </Button>
    ),
  },
];

const SupplierNeeds: FC<Props> = ({ users }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDateRange("");
    setSelectedLocation("");
  };

  const filteredusers = useMemo(() => {
    const now = new Date();
    return users.filter((order) => {
     const matchesSearch =
        order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.name.toLowerCase().includes(searchQuery.toLowerCase())
        
      const orderDate = new Date(order.createdAt);
      const matchesDateRange =
        (selectedDateRange === "ultima-semana" && isAfter(orderDate, subDays(now, 7))) ||
        (selectedDateRange === "ultimo-mes" && isAfter(orderDate, subMonths(now, 1))) ||
        (selectedDateRange === "ultimo-ano" && isAfter(orderDate, subYears(now, 1))) ||
        !selectedDateRange;
     
      return matchesSearch && matchesDateRange 
    });
  }, [users, searchQuery, selectedDateRange]);

  return (
    <div className="px-7">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 mt-8"
      >
        Listado de usuarios
      </motion.h1>

      {/* Sección de búsqueda y filtros */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <Search className="text-muted-foreground" />
            <Input
              placeholder="Buscar comunicados..."
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
            <Button variant="ghost" onClick={handleClearFilters}>
              <X className="h-4 w-4" /> Limpiar filtros
            </Button>
          </div>
          {/* Filtros desplegables */}
          <motion.div
            initial={false}
            animate={{ height: isFiltersOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Select
                onValueChange={(value) => setSelectedDateRange(value)}
                value={selectedDateRange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ultima-semana">Última semana</SelectItem>
                  <SelectItem value="ultimo-mes">Último mes</SelectItem>
                  <SelectItem value="ultimo-ano">Último año</SelectItem>
                </SelectContent>
              </Select>
            
            </div>
          </motion.div>
        </CardContent>
      </Card>
      {/* Tabla de datos */}
      <DataTable
        columns={usersColumn}
        data={filteredusers}
      />
    </div>
  );
};

export default SupplierNeeds;
