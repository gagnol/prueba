// components/ProfileModal.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  
  const ProfileModal = ({ isOpen, onClose, periodista }: any) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>Perfil del periodista</DialogTitle>
            <p id="dialog-description">Contacte con el periodista via Email </p>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle>{periodista?.name || "Sin nombre"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Email:</strong> {periodista?.email || "No disponible"}</p>
              <p><strong>Temas:</strong> {periodista?.topics?.join(', ') || "No disponible"}</p>
              <p><strong>Nombre del medio:</strong> {periodista?.mediaName || "No disponible"}</p>
              <p><strong>Tipo de medio:</strong> {periodista?.mediaType || "No disponible"}</p>
              <p><strong>Ubicación:</strong> {periodista?.location || "No disponible"}</p>
              <p><strong>Biografía:</strong> {periodista?.bio || "No disponible"}</p>
            </CardContent>
          </Card>
          <Button onClick={onClose} className="mt-4">Cerrar</Button>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ProfileModal;
  