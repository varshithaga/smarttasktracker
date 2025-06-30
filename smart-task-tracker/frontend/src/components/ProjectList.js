import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const fetchProjects = async (url = 'projects/') => {
    try {
      const res = await API.get(url);
      setProjects(res.data.results);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
    } catch (error) {
      alert('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getRelativeUrl = (absoluteUrl) => {
    const base = 'http://localhost:8000/api/';
    return absoluteUrl?.replace(base, '');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📁 All Projects</h2>

      {projects.map(project => (
        <div key={project.id} style={styles.card}>
          <h3 style={styles.title}>{project.title}</h3>
          <p style={styles.description}>{project.description}</p>
          <div style={styles.buttonGroup}>
            <Link to={`/projects/edit/${project.id}`} style={styles.button}>✏️ Edit</Link>
            <Link to={`/projects/${project.id}/tasks/create`} style={styles.button}>📝 Create Task</Link>
            <Link to={`/projects/${project.id}/tasks/assign`} style={styles.button}>👥 Assign Tasks</Link>
            <Link to={`/projects/${project.id}/tasks/lists`} style={styles.button}>📄 Task List</Link>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        {prevUrl && (
          <button
            style={styles.pageButton}
            onClick={() => fetchProjects(getRelativeUrl(prevUrl))}
          >
            ⬅️ Previous
          </button>
        )}
        {nextUrl && (
          <button
            style={styles.pageButton}
            onClick={() => fetchProjects(getRelativeUrl(nextUrl))}
          >
            Next ➡️
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    color: '#343a40',
  },
  card: {
    border: '1px solid #ddd',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '1.3rem',
    color: '#212529',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
    marginTop: '0.5rem',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '0.95rem',
  },
  pagination: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  pageButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default ProjectList;
