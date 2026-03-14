import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export function usePhotoGallery() {
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const takePhoto = async () => {
    try {
      const result = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 100
      });
      setPhoto(result.webPath);
    } catch (e) {
      console.log("Error camara:", e);
    }
  };

  return { photo, takePhoto };
}
