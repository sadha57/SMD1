import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useJobs } from '../../contexts/JobsContext';
import './JobCalendar.css';

const JobCalendar = () => {
  const { jobs } = useJobs();
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const events = jobs.map((job) => ({
    id: String(job.id),
    title: `${job.jobType} (${job.priority})`,
    date: job.scheduledDate,
    backgroundColor:
      job.status === 'Scheduled'
        ? '#f0ad4e'
        : job.status === 'In Progress'
        ? '#5bc0de'
        : '#5cb85c',
    borderColor: '#ccc',
  }));

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const jobsForDate = jobs.filter((job) => job.scheduledDate === clickedDate);
    setSelectedJobs(jobsForDate);
    setSelectedDate(clickedDate);
  };

  return (
    <div className="job-calendar-container">
      <h2>Maintenance Job Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek',
        }}
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />

      {selectedJobs.length > 0 && (
        <div className="selected-jobs">
          <h3>Jobs on {selectedDate}</h3>
          <ul>
            {selectedJobs.map((job) => (
              <li key={job.id}>
                <strong>{job.jobType}</strong> - {job.status}, Priority: {job.priority}, Engineer: {job.assignedEngineer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobCalendar;
