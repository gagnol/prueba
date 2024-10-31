// app/success/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Usa los componentes de ShadCN para estilizado
import { Loader2, CheckCircle } from "lucide-react"; // Lucide icons para feedback visual
import { useState } from "react";


const SuccessPage = () => {
 
  return (
    <div className="flex justify-center items-center h-44">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={24} />
            Suscripción Exitosa
          </CardTitle>
        </CardHeader>
        <CardContent>

Hola mundo        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
