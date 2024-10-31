"use client";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import { editAvatar } from "@/lib/action";
import ImageUpload from "@/components/User-navigation/UploadImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface AvatarRelease {
  _id: string; // Ensure _id is required
  image?: string;
  name: string;
  email: string;
}

export default function Avataredit({ user }: { user: AvatarRelease }) {
  const router = useRouter();
  const [image, setImage] = useState<string[]>(user.image ? [user.image] : []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (url: string) => setImage([url]);
  const handleImageRemove = () => setImage([]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    // Append the _id to formData
    formData.append("_id", user._id);
    
    if (image.length > 0) {
      formData.append("image", image[0]);
    }

    try {
      const res = await editAvatar(null, formData); // Use null as expected
      toast.success(res.message, { duration: 4000, position: "top-center" });

      setTimeout(() => {
        router.push("/profile/main");
      }, 2000);
    } catch (error) {
      toast.error("Error al actualizar el avatar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-background w-full">
      <Toaster />
      <div className="flex-1 overflow-auto p-0">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Edit className="mr-2" />
              Editar avatar
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
              {/* Hidden input to pass the user _id */}
              <input type="hidden" name="_id" value={user._id} />

              <div>
                <h4>Imagen de usuario</h4>
                <ImageUpload
                  value={image}
                  onChange={handleImageChange}
                  onRemove={handleImageRemove}
                />
              </div>
              <div className="flex justify-center">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
