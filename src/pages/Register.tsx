import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { authService } from "../services/auth.service";

export const Register: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PLAYER");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await authService.register({ name, email, password, role });
      alert("¡Registro exitoso! Ahora inicia sesión.");
      // Forzamos la redirección
      window.location.href = "/login";
    } catch (err: any) {
      setError("El correo ya existe o los datos son inválidos");
    }
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Registro Kick-Off</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        
        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput onIonInput={(e: any) => setName(e.target.value)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" onIonInput={(e: any) => setEmail(e.target.value)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" onIonInput={(e: any) => setPassword(e.target.value)} />
        </IonItem>

        <IonItem>
          <IonLabel>Rol</IonLabel>
          <IonSelect value={role} onIonChange={e => setRole(e.detail.value)}>
            <IonSelectOption value="PLAYER">PLAYER</IonSelectOption>
            <IonSelectOption value="OWNER">OWNER</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonButton expand="block" onClick={handleRegister} style={{ marginTop: "20px" }}>
          Registrar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
