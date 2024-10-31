"use client";

import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteMensaje } from "@/lib/action";
import { Button } from "@/components/ui/button"; // Adjust path if necessary

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("¿Está seguro de borrar el mensaje?");
    if (!confirmed) return;

    try {
      const res = await deleteMensaje(id);
      toast.success(res.message, { duration: 4000, position: "top-center" });

      setTimeout(() => {
        router.refresh(); // Refresh the page to reflect changes
      }, 2000);
    } catch (error) {
      toast.error("Error al eliminar el mensaje.");
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleDelete}
      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
      aria-label="Eliminar mensaje"
    >
      <Trash2 className="w-5 h-5" />
    </Button>
  );
};
