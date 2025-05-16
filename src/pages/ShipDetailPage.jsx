import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // ✅ Fixed: added useNavigate
import { useShips } from '../contexts/ShipsContext';
import styles from './ShipDetailPage.module.css';

const ShipDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Correct usage
  const { ships, updateShip } = useShips();

  const [ship, setShip] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    imoNumber: '',
    flag: '',
    status: 'Active',
  });

  // ✅ Detect edit mode from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setEditMode(queryParams.get('edit') === 'true');
  }, [location.search]);

  // ✅ Load ship by ID
  useEffect(() => {
    const found = ships.find((s) => s.id === id);
    if (found) {
      setShip(found);
      setFormData({ ...found });
    }
  }, [id, ships]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShip(formData);
    navigate('/ships'); // ✅ Redirect to ship list
  };

  if (!ship) {
    return <p className={styles.message}>🚫 Ship not found</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ship Details</h2>

      {editMode ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            IMO Number:
            <input
              type="text"
              name="imoNumber"
              value={formData.imoNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Flag:
            <input
              type="text"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              required
            />
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
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/ships')}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.details}>
          <p><strong>Name:</strong> {ship.name}</p>
          <p><strong>IMO Number:</strong> {ship.imoNumber}</p>
          <p><strong>Flag:</strong> {ship.flag}</p>
          <p><strong>Status:</strong> {ship.status}</p>
        </div>
      )}
    </div>
  );
};

export default ShipDetailPage;
