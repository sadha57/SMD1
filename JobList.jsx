import React, { useState } from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useAuth } from '../../contexts/AuthContext'; // ✅ Import auth
import { Link } from 'react-router-dom';
import styles from '../../styles/JobList.module.css';

const JobList = () => {
  const { jobs } = useJobs();
  const { user } = useAuth(); // ✅ Get logged-in user

  const [filters, setFilters] = useState({
    shipId: '',
    status: '',
    priority: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.shipId || job.shipId === Number(filters.shipId)) &&
      (!filters.status || job.status === filters.status) &&
      (!filters.priority || job.priority === filters.priority)
    );
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Maintenance Jobs</h2>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="number"
          name="shipId"
          placeholder="Ship ID"
          value={filters.shipId}
          onChange={handleFilterChange}
        />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" value={filters.priority} onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Job Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ship ID</th>
            <th>Component ID</th>
            <th>Job Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Engineer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.shipId}</td>
                <td>{job.componentId}</td>
                <td>{job.jobType}</td>
                <td>{job.priority}</td>
                <td>{job.status}</td>
                <td>{job.assignedEngineer}</td>
                <td>
                  <Link to={`/jobs/edit/${job.id}`} className={styles.editLink}>Edit</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.noJobs}>No jobs found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 👇 Show only for Admins */}
      {user?.role === 'Admin' && (
        <Link to="/jobs/add" className={styles.createBtn}>+ Create New Job</Link>
      )}
    </div>
  );
};

export default JobList;
