import React, { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonList, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { footballOutline } from "ionicons/icons";
import { canchasService } from "../services/canchas.service";

const Home: React.FC = () => {
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    canchasService.getCanchas()
      .then(data => setCanchas(data.slice(0, 3))) // Solo mostramos 3 en el Home
      .catch(err => console.log("Backend no disponible aún"));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Kick-Off</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText color="dark">
          <h1>Bienvenido a Kick-Off</h1>
          <p>Encuentra las mejores canchas cerca de ti.</p>
        </IonText>

        <h3 className="ion-padding-top">Canchas Destacadas</h3>
        <IonList>
          {canchas.map((cancha: any) => (
            <IonItem key={cancha.id} button routerLink="/tabs/tab2">
              <IonIcon icon={footballOutline} slot="start" />
              <IonLabel>
                <h2>{cancha.nombre}</h2>
                <p>{cancha.tipo}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
