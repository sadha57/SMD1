// import React from 'react';
// import { useNotification } from '../../contexts/NotificationContext';
// import './NotificationCenter.css';

// const NotificationCenter = () => {
//   const { notifications, removeNotification } = useNotification(); // Make sure this hook is used correctly

//   return (
//     <div className="notification-container">
//       {notifications.map((note) => (
//         <div key={note.id} className={`notification ${note.type}`}>
//           <span>{note.message}</span>
//           <button onClick={() => removeNotification(note.id)}>×</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotificationCenter;




import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import './NotificationCenter.css';

const NotificationCenter = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map((note) => (
        <div key={note.id} className={`notification ${note.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {note.type === 'success' && '✅'}
              {note.type === 'error' && '❌'}
              {note.type === 'info' && 'ℹ️'}
            </span>
            <span>{note.message}</span>
          </div>
          <button className="dismiss-btn" onClick={() => removeNotification(note.id)}>×</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
