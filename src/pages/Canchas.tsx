import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCard, IonCardContent } from '@ionic/react';

const Canchas: React.FC = () => {
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        setCoords({ lat: p.coords.latitude, lon: p.coords.longitude });
      });
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Canchas y Ubicacion GPS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard style={{'--background': '#f0f9ff'}}>
          <IonCardContent>
            <h2 style={{color: 'black'}}>📍 Mi Ubicacion Real</h2>
            {coords ? (
              <p>Latitud: {coords.lat.toFixed(4)} | Longitud: {coords.lon.toFixed(4)}</p>
            ) : (
              <p>Obteniendo GPS...</p>
            )}
          </IonCardContent>
        </IonCard>

        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Cancha Central</h2>
              <p>Futbol 7 - .00</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Estadio Norte</h2>
              <p>Futbol 11 - .00</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Canchas;