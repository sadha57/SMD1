import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useComponents } from '../../contexts/ComponentsContext';

const ComponentList = () => {
  const { shipId } = useParams();
  const { getComponentsByShip, deleteComponent } = useComponents();

  const components = getComponentsByShip(shipId);

  return (
    <div>
      <h3>Components for Ship #{shipId}</h3>
      <Link to={`/ship/${shipId}/components/add`}>Add Component</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Serial Number</th>
            <th>Install Date</th>
            <th>Last Maintenance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.serialNumber}</td>
              <td>{c.installationDate}</td>
              <td>{c.lastMaintenanceDate}</td>
              <td>
                <Link to={`/ship/${shipId}/components/${c.id}`}>View</Link> |{' '}
                <Link to={`/ship/${shipId}/components/${c.id}/edit`}>Edit</Link> |{' '}
                <button onClick={() => deleteComponent(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentList;
