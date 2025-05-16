import React, { createContext, useContext, useState } from 'react';

const ComponentsContext = createContext();

const initialComponents = [
  {
    id: 1,
    shipId: 1,
    name: 'Engine A',
    serialNumber: 'ENG-001',
    installationDate: '2023-01-10',
    lastMaintenanceDate: '2024-03-15',
  },
];

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState(initialComponents);

  const getComponentsByShip = (shipId) =>
    components.filter((c) => c.shipId === Number(shipId));

  const getComponentById = (id) => components.find((c) => c.id === Number(id));

  const addComponent = (component) => {
    setComponents((prev) => [...prev, { ...component, id: Date.now() }]);
  };

  const updateComponent = (updated) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const deleteComponent = (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ComponentsContext.Provider
      value={{
        components,
        getComponentsByShip,
        getComponentById,
        addComponent,
        updateComponent,
        deleteComponent,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponents = () => useContext(ComponentsContext);
