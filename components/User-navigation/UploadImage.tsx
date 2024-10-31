"use client"
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-40">
              <Button type="button" onClick={() => onRemove(url)} 
               className="bg-red-1 bg-red-500">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
              priority
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="avatar" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} >
              <Plus className="h-4 w-4 mr-2" />
              Subir imagen
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;