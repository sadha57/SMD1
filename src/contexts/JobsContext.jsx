import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/localStorageUtils';

const JobsContext = createContext();

// Default jobs for initial load if localStorage is empty
const defaultJobs = [
  {
    id: 1,
    shipId: 101,
    componentId: 'ENG-101',
    jobType: 'Inspection',
    priority: 'High',
    status: 'Scheduled',
    assignedEngineer: 'Engineer A',
  },
  {
    id: 2,
    shipId: 102,
    componentId: 'RAD-202',
    jobType: 'Repair',
    priority: 'Medium',
    status: 'In Progress',
    assignedEngineer: 'Engineer B',
  },
  {
    id: 3,
    shipId: 103,
    componentId: 'NAV-303',
    jobType: 'Maintenance',
    priority: 'Low',
    status: 'Completed',
    assignedEngineer: 'Engineer C',
  },
];

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const storedJobs = loadFromStorage('jobs');
    return storedJobs?.length ? storedJobs : defaultJobs;
  });

  useEffect(() => {
    saveToStorage('jobs', jobs);
  }, [jobs]);

  const addJob = (job) => {
    setJobs(prev => [...prev, job]);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(prev => prev.map(job => job.id === id ? updatedJob : job));
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
