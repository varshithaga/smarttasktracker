import { Link } from 'react-router-dom';

const DashboardAdmin = () => (
  <div style={styles.container}>
    <h2 style={styles.title}>Admin Dashboard</h2>
    <ul style={styles.menu}>
      <li style={styles.menuItem}>
        <Link to="/projects/create" style={styles.link}>➕ Create Project</Link>
      </li>
      <li style={styles.menuItem}>
        <Link to="/projects" style={styles.link}>📋 List All Projects</Link>
      </li>
    </ul>
  </div>
);

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#343a40',
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
  },
  menuItem: {
    margin: '1rem 0',
  },
  link: {
    fontSize: '1.2rem',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    padding: '0.6rem 1.2rem',
    border: '1px solid #007bff',
    borderRadius: '6px',
    display: 'inline-block',
    transition: 'background-color 0.3s, color 0.3s',
  },
  linkHover: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
};

export default DashboardAdmin;
