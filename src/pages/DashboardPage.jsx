import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { useAuth } from '../contexts/AuthContext';
import { useShips } from '../contexts/ShipsContext';
import { useJobs } from '../contexts/JobsContext';
import { Link } from 'react-router-dom';

import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';

import './DashboardPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const DashboardPage = () => {
  const { user } = useAuth();
  const { ships } = useShips();
  const { jobs } = useJobs();

  const [totalShips, setTotalShips] = useState(0);
  const [overdueComponents, setOverdueComponents] = useState(0);
  const [jobsInProgress, setJobsInProgress] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);

  useEffect(() => {
    setTotalShips(ships.length);

    let overdue = 0;
    ships.forEach(ship => {
      ship.components?.forEach(comp => {
        if (comp.lastMaintenanceDate && new Date(comp.lastMaintenanceDate) < new Date()) {
          overdue++;
        }
      });
    });
    setOverdueComponents(overdue);

    setJobsInProgress(jobs.filter(job => job.status === 'In Progress').length);
    setJobsCompleted(jobs.filter(job => job.status === 'Completed').length);
  }, [ships, jobs]);

  // Dummy data for chart
  const dummyInProgress = 15;
  const dummyCompleted = 25;

  const data = {
    labels: ['In Progress', 'Completed'],
    datasets: [
      {
        label: 'Jobs',
        data: [dummyInProgress, dummyCompleted],
        backgroundColor: ['#f39c12', '#27ae60'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="welcome-text">Welcome, {user?.role}</h2>

      {/* Optional: Replace default cards with reusable KPICards component */}
      {/* Or keep existing cards as-is, your call */}
      {/* <KPICards
        totalShips={totalShips}
        overdueComponents={overdueComponents}
        jobsInProgress={jobsInProgress}
        jobsCompleted={jobsCompleted}
      /> */}
<div className="cards-container">
  <Link to="/ships" className="card">
    <h3>Total Ships</h3>
    <p className="card-value blue">{totalShips}</p>
  </Link>

  <div className="card">
    <h3>Overdue Components</h3>
    <p className="card-value red">{overdueComponents}</p>
  </div>

  <Link to="/jobs" className="card">
    <h3>Jobs In Progress</h3>
    <p className="card-value yellow">{jobsInProgress}</p>
  </Link>

  <Link to="/jobs" className="card">
    <h3>Jobs Completed</h3>
    <p className="card-value green">{jobsCompleted}</p>
  </Link>
</div>
      <div className="chart-section">
        <h3>Job Status Overview</h3>
        <div className="chart-wrapper">
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Optional: Add additional charts from Charts.jsx if needed */}
      {/* <Charts /> */}

 

    </div>
  );
};

export default DashboardPage;
