import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreateTask = () => {
  const { id } = useParams(); // project ID
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    due_date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('tasks/', { ...task, project: id });
      alert('Task created');
      navigate('/projects');
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>📝 Create New Task</h2>

        <input
          style={styles.input}
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows={4}
          required
        />

        <label style={styles.label}>
          Status:
          <select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            style={styles.select}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label style={styles.label}>
          Due Date:
          <input
            type="date"
            value={task.due_date}
            onChange={(e) => setTask({ ...task, due_date: e.target.value })}
            style={styles.input}
            required
          />
        </label>

        <button type="submit" style={styles.button}>Create Task</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f5f6fa',
    minHeight: '100vh',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  textarea: {
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical'
  },
  label: {
    fontSize: '0.95rem',
    color: '#444',
    display: 'flex',
    flexDirection: 'column',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '5px',
    marginTop: '0.3rem',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    marginTop: '1rem',
    padding: '0.6rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default CreateTask;
