import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import { useNotification } from '../../contexts/NotificationContext';

const JobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs, addJob, updateJob } = useJobs();
  const { addNotification } = useNotification();

  const isEditing = Boolean(jobId);
  const existingJob = jobs.find((job) => job.id === Number(jobId));

  const [form, setForm] = useState({
    shipId: '',
    componentId: '',
    jobType: '',
    priority: 'Medium',
    status: 'Scheduled',
    assignedEngineer: '',
    scheduledDate: '',
  });

  useEffect(() => {
    if (isEditing && existingJob) {
      setForm(existingJob);
    }
  }, [isEditing, existingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      id: isEditing ? Number(jobId) : Date.now(),
    };

    if (isEditing) {
      updateJob(payload);
      addNotification('Job updated successfully.', 'info');
    } else {
      addJob(payload);
      addNotification('New job created successfully.', 'success');
    }

    navigate('/jobs');
  };

  return (
    <div style={styles.container}>
      <h2>{isEditing ? 'Edit Job' : 'Create Maintenance Job'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>

        <label>
          Ship ID:
          <input
            type="text"
            name="shipId"
            value={form.shipId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Component ID:
          <input
            type="text"
            name="componentId"
            value={form.componentId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Job Type:
          <input
            type="text"
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Priority:
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Scheduled">Scheduled</option>
            <option value="Open">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label>
          Assigned Engineer (Email):
          <input
            type="number"
            name="assignedEngineer"
            value={form.assignedEngineer}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Scheduled Date:
          <input
            type="date"
            name="scheduledDate"
            value={form.scheduledDate}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" style={styles.button}>
          {isEditing ? 'Update Job' : 'Create Job'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default JobForm;
