import { useState } from 'react';
import OrderList from './components/OrderList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚗 Приложение Курьера</h1>
      </header>
      <main>
        <OrderList />
      </main>
    </div>
  );
}

export default App;