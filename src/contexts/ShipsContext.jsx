import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/localStorageUtils';

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState(() => loadFromStorage('ships') || []);

  useEffect(() => {
    saveToStorage('ships', ships);
  }, [ships]);

  const addShip = (ship) => {
    setShips((prev) => [...prev, ship]);
  };

  const updateShip = (updatedShip) => {
    setShips((prev) =>
      prev.map((ship) => (ship.id === updatedShip.id ? updatedShip : ship))
    );
  };

  const deleteShip = (id) => {
    setShips((prev) => prev.filter((ship) => ship.id !== id));
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
