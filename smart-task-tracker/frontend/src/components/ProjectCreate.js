import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProjectCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('projects/', { title, description });
      alert('Project created');
      setTitle('');
      setDescription('');
      navigate('/dashboard');
    } catch {
      alert('Failed to create project');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create New Project</h2>
        
        <input
          style={styles.input}
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />

        <button type="submit" style={styles.button}>Create Project</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f7fa',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#343a40',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '0.8rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ProjectCreate;
