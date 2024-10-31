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
            <DialogTitle>
              Perfil del comunicador
              
              </DialogTitle>
              <p id="dialog-description">Contacte con el comunicador via Email </p>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle>{periodista?.name || "Sin nombre"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Email:</strong> {periodista?.email || "No disponible"}</p>
              <p><strong>Sector:</strong> {periodista?.sector || "No disponible"}</p>
              <p><strong>Empresa:</strong> {periodista?.organization|| "No disponible"}</p>
              <p><strong>Especialización:</strong> {periodista?.specialization || "No disponible"}</p>
              <p><strong>Experiencia:</strong> {periodista?.experience || "No disponible"}</p>
              <p><strong>Ubicación </strong> {periodista?.location || "No disponible"}</p>
              <p><strong>Biografía:</strong> {periodista?.bio || "No disponible"}</p>
            </CardContent>
          </Card>
          <Button onClick={onClose} className="mt-4">Cerrar</Button>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ProfileModal;
  