import React from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel } from "@ionic/react";
import { home, football, person, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { authService } from "../services/auth.service";

const SideMenu: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    authService.logout(); // Esto ya limpia localStorage y redirige
  };

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menú Kick-Off</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem button onClick={() => history.push("/tabs/tab1")} detail={false}>
            <IonIcon icon={home} slot="start" />
            <IonLabel>Inicio</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/tabs/tab2")} detail={false}>
            <IonIcon icon={football} slot="start" />
            <IonLabel>Canchas</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/tabs/tab3")} detail={false}>
            <IonIcon icon={person} slot="start" />
            <IonLabel>Perfil</IonLabel>
          </IonItem>
          <IonItem button onClick={handleLogout} lines="none">
            <IonIcon icon={logOutOutline} slot="start" color="danger" />
            <IonLabel color="danger">Cerrar Sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
