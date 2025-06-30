import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ title: '', description: '' });

  useEffect(() => {
    API.get(`projects/${id}/`)
      .then(res => setProject(res.data))
      .catch(() => alert('Failed to fetch project details.'));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`projects/${id}/`, project);
      alert('✅ Project updated successfully');
      navigate('/projects');
    } catch (err) {
      alert('❌ Error updating project');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleUpdate} style={styles.form}>
        <h2 style={styles.heading}>✏️ Edit Project</h2>

        <label style={styles.label}>Title</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          style={styles.input}
          required
        />

        <label style={styles.label}>Description</label>
        <textarea
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          style={styles.textarea}
          rows={5}
          required
        />

        <button type="submit" style={styles.button}>Update Project</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.6rem',
    color: '#333',
  },
  label: {
    marginBottom: '0.3rem',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    padding: '0.6rem',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
  },
  button: {
    padding: '0.7rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default ProjectEdit;
