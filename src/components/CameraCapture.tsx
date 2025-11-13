import { useRef, useEffect } from 'react';

interface CameraCaptureProps {
  onPhotoTaken: (photoUrl: string) => void;
  onCancel: () => void;
}

export default function CameraCapture({ onPhotoTaken, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      // Fallback - создаем тестовое фото
      onPhotoTaken('https://via.placeholder.com/400x300/008000/FFFFFF?text=Фото+доставки');
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 400, 300);
        const photoUrl = canvasRef.current.toDataURL('image/png');
        onPhotoTaken(photoUrl);
      }
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'black',
      zIndex: 1000
    }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', height: '100%' }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300" />
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        <button onClick={takePhoto} style={{
          padding: '15px 30px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50px'
        }}>
          📸 Сделать фото
        </button>
        <button onClick={onCancel} style={{
          padding: '15px 30px',
          fontSize: '16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '50px'
        }}>
          ❌ Отмена
        </button>
      </div>
    </div>
  );
}