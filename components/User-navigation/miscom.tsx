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
import { Input } from "../ui/input";
import { subDays, subMonths, subYears, isAfter } from "date-fns";
import { toast } from "react-hot-toast";
import { deleteComicacion } from "@/lib/action";
import { redirect } from "next/navigation";


interface Props {
  orders: any[]; // Adjust based on the order model
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
    redirect("/profile/main")
  }, 2000);
};

// Columns for DataTable
export const ordersColumn: ColumnDef<any>[] = [
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
    accessorKey: "title",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Título</div>,
    cell: ({ row }) => (
      <div className="font-bold">
        {row.original.title.length > 50
          ? `${row.original.title.substring(0, 50)}...`
          : row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "topic",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Tópico</div>,
    cell: ({ row }) => <div>{row.original.topic}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Fecha</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="font-[700] text-[14px] text-[#8A8A8A]">Status</div>,
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/profile/crear/${row.original._id}`}>
        <Button size="sm" variant="ghost">
          <Eye />
        </Button>
      </Link>
    ),
  },
  {
    id: "edit",
    cell: ({ row }) => (
      <Link href={`/profile/main/comunicados/${row.original._id}`}>
        <Button variant="ghost" className="text-blue-500 hover:text-blue-700"><Edit size={24} />
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

const Miscomunicaciones: FC<Props> = ({ orders }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDateRange("");
    setSelectedLocation("");
  };

  const filteredOrders = useMemo(() => {
    const now = new Date();
    return orders.filter((order) => {
      const matchesSearch =
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.location.toLowerCase().includes(searchQuery.toLowerCase());

      const orderDate = new Date(order.createdAt);
      const matchesDateRange =
        (selectedDateRange === "ultima-semana" && isAfter(orderDate, subDays(now, 7))) ||
        (selectedDateRange === "ultimo-mes" && isAfter(orderDate, subMonths(now, 1))) ||
        (selectedDateRange === "ultimo-ano" && isAfter(orderDate, subYears(now, 1))) ||
        !selectedDateRange;

      const matchesLocation = selectedLocation
        ? order.location === selectedLocation
        : true;

      return matchesSearch && matchesDateRange && matchesLocation;
    });
  }, [orders, searchQuery, selectedDateRange, selectedLocation]);

  return (
    <div className="px-7">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 mt-8"
      >
        Mis Comunicados
      </motion.h1>
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
        </CardContent>
      </Card>
      <DataTable columns={ordersColumn} data={filteredOrders} />
    </div>
  );
};

export default Miscomunicaciones;