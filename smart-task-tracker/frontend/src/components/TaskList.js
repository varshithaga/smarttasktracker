import React, { useEffect, useState } from 'react';
import API from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('tasks/');
      const taskList = Array.isArray(res.data.results) ? res.data.results : res.data;

      setTasks(taskList);

      const initialStatusMap = {};
      taskList.forEach(task => {
        initialStatusMap[task.id] = task.status;
      });
      setUpdatedStatuses(initialStatusMap);
    } catch (err) {
      alert('Failed to fetch tasks');
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    setUpdatedStatuses(prev => ({
      ...prev,
      [taskId]: newStatus
    }));
  };

  const handleSubmitStatus = async (taskId) => {
    try {
      await API.patch(`tasks/${taskId}/`, { status: updatedStatuses[taskId] });
      alert('Status updated!');
      fetchTasks();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🗂️ Your Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} style={styles.card}>
            <h3>{task.title}</h3>
            <p><strong>Project:</strong> {task.project?.title || `#${task.project?.id || 'N/A'}`}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Due Date:</strong> {task.due_date || 'N/A'}</p>

            <div style={styles.controls}>
              <label htmlFor={`status-${task.id}`}>Update Status:</label>
              <select
                id={`status-${task.id}`}
                value={updatedStatuses[task.id] || task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                style={styles.select}
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button onClick={() => handleSubmitStatus(task.id)} style={styles.button}>
                Submit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: '1.2rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  controls: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  select: {
    padding: '0.4rem',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TaskList;
