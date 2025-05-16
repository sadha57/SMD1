import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShips } from '../../contexts/ShipsContext';

const ShipForm = () => {
  const { addShip, editShip, getShipById } = useShips();
  const { id } = useParams();
  const navigate = useNavigate();

  const [ship, setShip] = useState({
    name: '',
    imoNumber: '',
    flag: '',
    status: '',
  });

  useEffect(() => {
    if (id) {
      const existingShip = getShipById(Number(id));
      if (existingShip) {
        setShip(existingShip);
      }
    }
  }, [id, getShipById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShip((prevShip) => ({
      ...prevShip,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Update existing ship
      editShip(ship);
    } else {
      // Add new ship
      addShip({ ...ship, id: Date.now() });
    }

    navigate('/ships');
  };

  return (
    <div>
      <h2>{id ? 'Edit Ship' : 'Add New Ship'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={ship.name}
          onChange={handleChange}
          placeholder="Ship Name"
          required
        />
        <input
          type="text"
          name="imoNumber"
          value={ship.imoNumber}
          onChange={handleChange}
          placeholder="IMO Number"
          required
        />
        <input
          type="text"
          name="flag"
          value={ship.flag}
          onChange={handleChange}
          placeholder="Flag"
          required
        />
        <input
          type="text"
          name="status"
          value={ship.status}
          onChange={handleChange}
          placeholder="Status"
          required
        />
        <button type="submit">{id ? 'Update Ship' : 'Add Ship'}</button>
      </form>
    </div>
  );
};

export default ShipForm;
