import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('token/', credentials);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      const userRes = await API.get('me/');
      setUser(userRes.data);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          style={styles.input}
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
<div style={styles.passwordWrapper}>
  <input
    style={styles.passwordInput}
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    value={credentials.password}
    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={styles.eyeIcon}
    title={showPassword ? 'Hide Password' : 'Show Password'}
  >
    {showPassword ? '🙈' : '👁️'}
  </span>
</div>


        <button type="submit" style={styles.button}>Login</button>

        <div style={styles.registerRow}>
          <span style={styles.text}>Don't have an account?</span>
          <button type="button" onClick={() => navigate('/register')} style={styles.registerLink}>
            Register
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
    background: '#e9ecef',
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
  },
  button: {
    padding: '0.6rem',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  registerSection: {
    marginTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  registerButton: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  registerRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.75rem',
    gap: '0.5rem'
  },
  text: {
    fontSize: '0.95rem',
    color: '#555',
  },
  registerLink: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    fontSize: '1.1rem',
  },
  input: {
  marginBottom: '1rem',
  padding: '0.6rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  boxSizing: 'border-box',
},

passwordWrapper: {
  position: 'relative',
  marginBottom: '1rem',
},

passwordInput: {
  padding: '0.6rem',
  fontSize: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  boxSizing: 'border-box',
  paddingRight: '2.5rem', // space for the eye icon
},

eyeIcon: {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  fontSize: '1.1rem',
  color: '#333',
}



};

export default Login;
