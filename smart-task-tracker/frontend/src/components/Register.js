import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('register/', data);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Error in registration');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.title}>Register</h2>
        <input
          style={styles.input}
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit" style={styles.button}>Register</button>

        <div style={styles.loginRow}>
          <span style={styles.text}>Already have an account?</span>
          <button type="button" onClick={() => navigate('/login')} style={styles.loginLink}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f7fa',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2.5rem',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '340px',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#343a40',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.6rem',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  loginRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    gap: '0.5rem',
  },
  text: {
    fontSize: '0.95rem',
    color: '#555',
  },
  loginLink: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
  },
};

export default Register;
