import React from 'react';
import { Link } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';
import styles from './ShipList.module.css';
import ShipsPage from '../../pages/ShipsPage';
import AddShip from '../../pages/AddShip';
import { useAuth } from '../../contexts/AuthContext';

const ShipList = () => {
  const { user } = useAuth();
  const { ships, deleteShip } = useShips();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ship?')) {
      deleteShip(id);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ship List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>IMO Number</th>
            <th>Flag</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship) => (
            <tr key={ship.id}>
              <td>{ship.name}</td>
              <td>{ship.imoNumber}</td>
              <td>{ship.flag}</td>
              <td>{ship.status}</td>
              <td className={styles.actions}>
                <Link to={`/ships/${ship.id}`} className={styles.viewBtn}>View</Link>
                <Link to={`/ships/${ship.id}?edit=true`} className={styles.editBtn}>Edit</Link>
                <button onClick={() => handleDelete(ship.id)} className={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {user?.role === 'Admin' && (
          <Link to="/ships/add" className={styles.addBtn}>+ Add New Ship
     
      </Link>
      )}
    </div>
  );
};

export default ShipList;
