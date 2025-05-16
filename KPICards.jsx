import React from 'react';
import './KPICards.css';

const KPICards = ({ totalShips, overdueComponents, jobsInProgress, jobsCompleted }) => {
  return (
    <div className="cards-container">
      <div className="card">
        <h3>Total Ships</h3>
        <p className="card-value blue">{totalShips}</p>
      </div>
      <div className="card">
        <h3>Overdue Components</h3>
        <p className="card-value red">{overdueComponents}</p>
      </div>
      <div className="card">
        <h3>Jobs In Progress</h3>
        <p className="card-value yellow">{jobsInProgress}</p>
      </div>
      <div className="card">
        <h3>Jobs Completed</h3>
        <p className="card-value green">{jobsCompleted}</p>
      </div>
    </div>
  );
};

export default KPICards;
