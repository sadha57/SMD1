import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComponents } from '../../contexts/ComponentsContext';

const ComponentForm = () => {
  const { shipId, componentId } = useParams();
  const navigate = useNavigate();
  const { addComponent, updateComponent, getComponentById } = useComponents();

  const [form, setForm] = useState({
    name: '',
    serialNumber: '',
    installationDate: '',
    lastMaintenanceDate: '',
  });

  useEffect(() => {
    if (componentId) {
      const existing = getComponentById(componentId);
      if (existing) setForm(existing);
    }
  }, [componentId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, shipId: Number(shipId), id: componentId ? Number(componentId) : undefined };

    if (componentId) {
      updateComponent(data);
    } else {
      addComponent(data);
    }
    navigate(`/ship/${shipId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{componentId ? 'Edit' : 'Add'} Component</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Component Name" required />
      <input name="serialNumber" value={form.serialNumber} onChange={handleChange} placeholder="Serial Number" required />
      <input type="date" name="installationDate" value={form.installationDate} onChange={handleChange} required />
      <input type="date" name="lastMaintenanceDate" value={form.lastMaintenanceDate} onChange={handleChange} required />
      <button type="submit">{componentId ? 'Update' : 'Add'} Component</button>
    </form>
  );
};

export default ComponentForm;
