import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', fontSize: '24px' }}>🚚 Приложение Курьера</h1>
      <p style={{ color: '#666', fontSize: '16px' }}>Тестовая страница - React работает!</p>
      <button 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          marginTop: '20px'
        }}
        onClick={() => alert('React функционирует корректно!')}
      >
        Тестовая кнопка
      </button>
    </div>
  );
}

export default App;