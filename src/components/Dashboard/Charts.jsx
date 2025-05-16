import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import './Charts.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Charts = () => {
  const dummyInProgress = 10;
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-section">
      <h3>Job Status Overview</h3>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;
