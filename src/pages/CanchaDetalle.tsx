import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonDatetime, IonButton, IonIcon, IonSpinner, IonCard, IonText, IonAlert } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { calendarOutline, locationOutline, footballOutline } from "ionicons/icons";
import axios from "axios";

const CanchaDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [cancha, setCancha] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fechaReserva, setFechaReserva] = useState<string>(new Date().toISOString());
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/canchas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const found = response.data.find((c: any) => c.id.toString() === id);
        setCancha(found);
      } catch (error) {
        console.error("Error al obtener detalle:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCancha();
  }, [id]);

  const handleReserva = async () => {
    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail") || "usuario_anonimo";

      // LLAMADA AL BACKEND (Punto C: Validación y Respuesta)
      const response = await axios.post("http://localhost:3000/api/reservas", {
        canchaId: id,
        fecha: fechaReserva,
        usuarioId: userEmail // Enviamos el identificador del usuario
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Si el servidor responde 201 (Creado)
      setAlertHeader("¡Éxito!");
      setAlertMessage(`Reserva confirmada. ID: ${response.data.id_reserva}`);
      setShowAlert(true);
      
    } catch (error: any) {
      // Manejo de errores 400 o 500 del Backend (Paso C)
      setAlertHeader("Error en la Reserva");
      const msg = error.response?.data?.error || "No se pudo conectar con el servidor";
      setAlertMessage(msg);
      setShowAlert(true);
    }
  };

  if (loading) return <IonPage><IonContent className="ion-padding ion-text-center"><IonSpinner /></IonContent></IonPage>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start"><IonBackButton defaultHref="/tabs/canchas" /></IonButtons>
          <IonTitle>Reservar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {cancha && (
          <>
            <IonCard>
              <img src={cancha.imagen} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <h2 style={{ margin: 0 }}>{cancha.nombre}</h2>
                <p><IonIcon icon={locationOutline} /> {cancha.ubicacion}</p>
              </div>
            </IonCard>

            <IonItem lines="none">
              <IonLabel><b>Selecciona Fecha y Hora:</b></IonLabel>
            </IonItem>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IonDatetime 
                value={fechaReserva}
                onIonChange={e => setFechaReserva(e.detail.value as string)}
                preferWheel={true}
              />
            </div>

            <IonButton expand="block" onClick={handleReserva} style={{ marginTop: '20px' }}>
              Confirmar en Servidor
            </IonButton>
          </>
        )}

        <IonAlert
          isOpen={showAlert}
          header={alertHeader}
          message={alertMessage}
          buttons={[{ text: 'OK', handler: () => { if(alertHeader === "¡Éxito!") history.push('/tabs/canchas') } }]}
          onDidDismiss={() => setShowAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default CanchaDetalle;
