import React, { useRef, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonText, IonList, IonItem } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { authService } from "../services/auth.service";

export const Login: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const handleLogin = async () => {
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;

    if (!email || !password) {
      setError("Por favor rellena todos los campos");
      return;
    }

    try {
      await authService.login({ email, password });
      window.location.href = "/tabs/tab1"; 
    } catch (err: any) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Acceso</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {error && <IonText color="danger"><p style={{textAlign: "center"}}>{error}</p></IonText>}
          
          <IonItem>
            <IonInput 
              ref={emailRef} 
              label="Correo Electrónico" 
              labelPlacement="floating" 
              type="email" 
              placeholder="ejemplo@correo.com" 
            />
          </IonItem>

          <IonItem>
            <IonInput 
              ref={passwordRef} 
              label="Contraseña" 
              labelPlacement="floating" 
              type="password" 
            />
          </IonItem>

          <div style={{ marginTop: "20px" }}>
            <IonButton expand="block" onClick={handleLogin}>Entrar</IonButton>
            <IonButton fill="clear" expand="block" onClick={() => history.push("/onboarding")}>
              Volver atrás
            </IonButton>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
