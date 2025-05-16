import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShips } from '../contexts/ShipsContext';
import styles from '../pages/AddShip.module.css';


const AddShip = () => {
  const { addShip } = useShips();
  const navigate = useNavigate();

  const [shipData, setShipData] = useState({
    name: '',
    imoNumber: '',
    flag: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shipData.name || !shipData.imoNumber || !shipData.flag) {
      alert('Please fill in all required fields.');
      return;
    }

    const newShip = { ...shipData, id: Date.now().toString() };
    addShip(newShip); // Add ship to context

    // Navigate to the new ship's detail page
    navigate(`/ships`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add New Ship</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={shipData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          IMO Number:
          <input
            type="text"
            name="imoNumber"
            value={shipData.imoNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Flag:
          <input
            type="text"
            name="flag"
            value={shipData.flag}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" value={shipData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Docked">Docked</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </label>
        <button type="submit" className={styles.submitBtn}>Add Ship</button>
      </form>
    </div>
  );
};

export default AddShip;
