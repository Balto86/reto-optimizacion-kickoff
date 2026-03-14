import React from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent, IonText, IonButton } from "@ionic/react";

const Onboarding: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "100%",
          padding: "20px",
          textAlign: "center"
        }}>
          <h1 style={{ color: "#3880ff", fontSize: "42px" }}>🎉 KICK-OFF</h1>
          <p style={{ fontSize: "18px", color: "#666" }}>La mejor app para tus partidos.</p>
          
          <div style={{ width: "100%", maxWidth: "300px", marginTop: "30px" }}>
            <IonButton expand="block" onClick={() => history.push("/login")}>
              Iniciar Sesión
            </IonButton>
            <IonButton expand="block" fill="outline" onClick={() => history.push("/register")} style={{ marginTop: "10px" }}>
              Registrarse
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
