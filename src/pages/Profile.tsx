import { usePhotoGallery } from '../hooks/usePhotoGallery';
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonItem, IonLabel, IonList, IonButton, IonIcon, IonCard, IonCardContent, IonText } from '@ionic/react';
import { logOutOutline, personCircleOutline, timeOutline, calendarOutline, cameraOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Profile: React.FC = () => {
  const { photo, takePhoto } = usePhotoGallery();
  const history = useHistory();
  const user = { nombre: "Usuario Kick-Off", email: localStorage.getItem("userEmail") || "usuario@ejemplo.com" };

  return (
    <IonPage>
      <IonHeader><IonToolbar color="primary"><IonTitle>Mi Perfil</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <IonAvatar style={{ width: '100px', height: '100px', margin: '0 auto' }}>
            {photo ? (
              <img src={photo} alt="Perfil" />
            ) : (
              <IonIcon icon={personCircleOutline} style={{ fontSize: '100px', color: '#ccc' }} />
            )}
          </IonAvatar>
          <IonButton fill="clear" onClick={() => takePhoto()}>
            <IonIcon slot="icon-only" icon={cameraOutline} />
          </IonButton>
          <h2>{user.nombre}</h2>
          <p>{user.email}</p>
        </div>

        <IonList>
          <IonCard>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel>
                  <h2>Estadio Principal 1</h2>
                  <p><IonIcon icon={calendarOutline} /> 20 de Marzo, 2026</p>
                  <p><IonIcon icon={timeOutline} /> 18:00 hrs</p>
                </IonLabel>
                <IonText color="success">Confirmada</IonText>
              </IonItem>
            </IonCardContent>
          </IonCard>
        </IonList>

        <IonButton expand="block" color="danger" fill="outline" onClick={() => history.push('/login')}>
          <IonIcon slot="start" icon={logOutOutline} /> Cerrar Sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Profile;
