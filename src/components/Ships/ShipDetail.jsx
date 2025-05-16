import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import styles from './ShipDetail.module.css';

const ShipDetail = () => {
  const { id } = useParams();
  const { ships, updateShip } = useShips();
  const navigate = useNavigate();
  const location = useLocation();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    imoNumber: '',
    flag: '',
    status: 'Active',
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('edit') === 'true') {
      setEditMode(true);
    }
  }, [location.search]);

  useEffect(() => {
    const ship = ships.find((s) => s.id === id);
    if (ship) {
      setFormData({ ...ship });
    }
  }, [id, ships]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShip(formData);
    setEditMode(false);
  };

  const ship = ships.find((s) => s.id === id);

  if (!ship) return <p className={styles.notFound}>🚫 Ship not found</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ship Details</h2>

      {editMode ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            IMO Number:
            <input type="text" name="imoNumber" value={formData.imoNumber} onChange={handleChange} required />
          </label>
          <label>
            Flag:
            <input type="text" name="flag" value={formData.flag} onChange={handleChange} required />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Docked">Docked</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </label>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveBtn}>Save</button>
            <button type="button" className={styles.cancelBtn} onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className={styles.details}>
          <p><strong>Name:</strong> {ship.name}</p>
          <p><strong>IMO Number:</strong> {ship.imoNumber}</p>
          <p><strong>Flag:</strong> {ship.flag}</p>
          <p><strong>Status:</strong> {ship.status}</p>
          <button onClick={() => setEditMode(true)} className={styles.editBtn}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ShipDetail;
