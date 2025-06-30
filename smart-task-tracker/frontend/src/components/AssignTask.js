import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const AssignTask = () => {
  const { id } = useParams(); // Project ID
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [statuses, setStatuses] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    API.get('tasks/')
      .then(res => {
        const taskList = Array.isArray(res.data.results) ? res.data.results : res.data;
        setTasks(taskList.filter(task => task.project.id === parseInt(id))); 
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
        alert('Failed to fetch tasks.');
      });

    API.get('me/').then(userRes => {
      const isAdminUser = userRes.data.role === 'admin';
      setIsAdmin(isAdminUser);
      if (isAdminUser) {
        API.get('users/').then(res => {
          const userList = Array.isArray(res.data.results) ? res.data.results : res.data;
          setUsers(userList.filter(u => u.role === 'contributor'));
        });
      }
    });

    API.get(`projects/${id}/`)
      .then(res => setProject(res.data))
      .catch(err => console.error('Error fetching project:', err));

  }, [id]);

  const handleAssignChange = (taskId, userId) => {
    setAssignments(prev => ({ ...prev, [taskId]: parseInt(userId) }));
  };

  const handleStatusChange = (taskId, status) => {
    setStatuses(prev => ({ ...prev, [taskId]: status }));
  };

  const handleAssign = async (taskId) => {
    const userId = assignments[taskId];
    if (!userId) return alert('Please select a contributor first.');
    try {
      await API.patch(`tasks/${taskId}/`, { assigned_to_id: userId });
      alert('✅ Task assigned successfully!');
    } catch {
      alert('❌ Error assigning task');
    }
  };

  const handleStatusUpdate = async (taskId) => {
    const status = statuses[taskId];
    if (!status) return alert('Please select a status.');
    try {
      await API.patch(`tasks/${taskId}/`, { status });
      alert('✅ Status updated!');
    } catch {
      alert('❌ Error updating status');
    }
  };

  return (
    <div style={styles.container}>
    <h2 style={styles.heading}>
      🧩 Manage & Assign Tasks {project ? `(${project.title})` : `(Project #${id})`}
    </h2>      
{tasks.length === 0 ? (
        <p style={styles.noTasks}>No tasks found for this project.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} style={styles.taskCard}>
            <h3 style={styles.taskTitle}>{task.title}</h3>
            <p><strong>Status:</strong> {task.status}</p>

            {/* Assign Section */}
            <div style={styles.row}>
              <label style={styles.label}>Assign to:</label>
              <select
                value={assignments[task.id] || task.assigned_to?.id || ''}
                onChange={(e) => handleAssignChange(task.id, e.target.value)}
                style={styles.select}
              >
                <option value="">Select contributor</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>  {user.username.split('@')[0]}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAssign(task.id)} style={styles.button}>
                Assign
              </button>
            </div>

            {/* Status Section */}
            <div style={styles.row}>
              <label style={styles.label}>Change status:</label>
              <select
                value={statuses[task.id] || task.status || ''}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                style={styles.select}
              >
                <option value="">Select status</option>
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button onClick={() => handleStatusUpdate(task.id)} style={styles.buttonGreen}>
                Update Status
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
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#343a40',
    fontSize: '1.8rem',
  },
  noTasks: {
    textAlign: 'center',
    color: '#888',
  },
  taskCard: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  taskTitle: {
    color: '#333',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  label: {
    minWidth: '100px',
    fontWeight: 'bold',
  },
  select: {
    flex: '1',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonGreen: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default AssignTask;
