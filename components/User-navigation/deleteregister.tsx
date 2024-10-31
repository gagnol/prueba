"use client";

import { deleteRegister } from "@/lib/action";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, MouseEvent } from "react";
import { toast } from "react-hot-toast";

interface DeleteButtonProps {
  _id: string; // ID of the item to delete
  onDelete?: (id: string) => void; // Optional callback after deletion
}

export default function DeleteButton({ _id }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior

    const confirmed = confirm("¿Está seguro de cancelar el registro?");
    if (!confirmed) return;

    setLoading(true); // Start loading state

    try {
      const formData = new FormData();
      formData.append("_id", _id); // Add the item ID to the form data

      const res = await deleteRegister(null, formData); // Pass both arguments
      toast.success(res.message, { duration: 4000, position: "top-center" });
     
      setTimeout(() => {
        redirect("/profile/main");
      }, 1000);
    } catch (error) {
      toast.error("Ocurrió un error al intentar eliminar el registro.");
      console.error("Delete error:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-800"
      aria-label="Delete"
    >
      <Trash2 size={20} />
    </button>
  );
}
