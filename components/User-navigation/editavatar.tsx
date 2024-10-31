"use client";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import { editAvatar } from "@/lib/action";
import { useSession } from "next-auth/react";
import ImageUpload from "@/components/User-navigation/UploadImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface AvatarRelease {
  _id: string; // Add _id to the interface
  image?: string;
}

export default function Avataredit({ user }: { user: AvatarRelease }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [image, setImage] = useState<string[]>(user.image ? [user.image] : []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (url: string) => setImage([url]);
  const handleImageRemove = () => setImage([]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    // Append additional data
    
    if (image.length > 0) formData.append("image", image[0]);
    
    const res = await editAvatar(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsSubmitting(false);

    setTimeout(() => {
      router.push("/profile/main");
    }, 2000);
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
                    <input type="hidden" name="_id" value={user._id} /> {/* Hidden input for _id */}
                  <div>
                  <h4>Imagen de usario</h4>
                  <ImageUpload value={image} onChange={handleImageChange} onRemove={handleImageRemove} />
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
