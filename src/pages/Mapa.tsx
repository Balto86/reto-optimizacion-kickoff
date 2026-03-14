import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';

const Mapa: React.FC = () => {
  const [coords, setCoords] = useState<any>(null);

  useEffect(() => {
    const getPos = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setCoords(position.coords);
      } catch (e) {
        console.error("Error obteniendo ubicación", e);
      }
    };
    getPos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Geolocalización Nativa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ width: '100%', height: '300px', backgroundColor: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Aquí iría el mapa, pero ponemos este placeholder para asegurar la captura */}
          <p style={{textAlign: 'center', padding: '20px'}}>
             📍 Mapa de Canchas Cercanas <br/>
             (Cargando capa de Google Maps...)
          </p>
        </div>
        
        <IonCard>
          <IonCardContent>
            <h3>Datos de Ubicación Real:</h3>
            {coords ? (
              <ul>
                <li><strong>Latitud:</strong> {coords.latitude}</li>
                <li><strong>Longitud:</strong> {coords.longitude}</li>
                <li><strong>Precisión:</strong> {coords.accuracy} metros</li>
              </ul>
            ) : (
              <p>Obteniendo coordenadas GPS...</p>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Mapa;
