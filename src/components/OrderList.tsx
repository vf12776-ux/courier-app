import { useEffect, useState } from 'react';
import { db, type Order } from '../db';
import CameraCapture from './CameraCapture';
import { sendSMS } from '../services/notifications';

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const allOrders = await db.orders.toArray();
    setOrders(allOrders);
  };

  const addTestOrder = async () => {
    await db.orders.add({
      orderId: 'ORDER-' + Date.now(),
      address: 'ул. Примерная, д. 1',
      customerName: 'Иван Иванов',
      customerPhone: '+79991234567',
      items: 'Пицца, напиток',
      status: 'new',
      createdAt: new Date()
    });
    loadOrders();
  };

  const acceptOrder = async (orderId: number) => {
    const order = await db.orders.get(orderId);
    if (order) {
      await db.orders.update(orderId, { status: 'accepted' });
      await sendSMS(order.customerPhone, `Курьер выехал по заказу ${order.orderId}`);
      loadOrders();
    }
  };

  const deliverOrder = async (orderId: number) => {
    setCurrentOrderId(orderId);
    setShowCamera(true);
  };

  const handlePhotoTaken = async (photoUrl: string) => {
    if (currentOrderId) {
      const order = await db.orders.get(currentOrderId);
      if (order) {
        await db.orders.update(currentOrderId, { 
          status: 'delivered',
          photoUrl 
        });
        await sendSMS(order.customerPhone, `Курьер доставил заказ ${order.orderId}`);
        loadOrders();
      }
    }
    setShowCamera(false);
    setCurrentOrderId(null);
  };

  return (
    <div>
      {showCamera && (
        <CameraCapture 
          onPhotoTaken={handlePhotoTaken}
          onCancel={() => setShowCamera(false)}
        />
      )}
      
      <h2>Заказы ({orders.length})</h2>
      <button onClick={addTestOrder}>+ Добавить тестовый заказ</button>
      
      <div style={{ marginTop: '20px' }}>
        {orders.map(order => (
          <div key={order.id} style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <h3>Заказ #{order.orderId}</h3>
            <p><strong>Адрес:</strong> {order.address}</p>
            <p><strong>Клиент:</strong> {order.customerName} ({order.customerPhone})</p>
            <p><strong>Товары:</strong> {order.items}</p>
            <p><strong>Статус:</strong> {order.status}</p>
            
            {order.photoUrl && (
              <div>
                <strong>Фотоотчет:</strong>
                <img src={order.photoUrl} alt="Фото доставки" style={{ maxWidth: '200px', marginTop: '10px' }} />
              </div>
            )}
            
            <div style={{ marginTop: '10px' }}>
              {order.status === 'new' && (
                <button onClick={() => acceptOrder(order.id!)}>
                  Принять заказ
                </button>
              )}
              {order.status === 'accepted' && (
                <button onClick={() => deliverOrder(order.id!)}>
                  Доставлен
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}