import React, { useEffect, useState } from 'react';
import API from '../services/api';

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get('logs/');
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching activity logs:', err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <h3>Activity Log</h3>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.task_title}</strong><br />
              Previous Assignee: {log.previous_assignee || 'None'}<br />
              Status: {log.previous_status}<br />
              Due Date: {log.previous_due_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;
