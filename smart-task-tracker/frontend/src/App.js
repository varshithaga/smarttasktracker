import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardContributor from './components/DashboardContributor';
import API from './services/api';
import ProjectCreate from './components/ProjectCreate';
import ProjectEdit from './components/ProjectEdit';
import AssignTask from './components/AssignTask';
import CreateTask from './components/CreateTask';
import ProjectList from './components/ProjectList';
import TaskListByProject from './components/TaskListByProject';

function App() {
  const [user, setUser] = useState(null);

  // Optional: auto-load user from token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access');
      if (token) {
        try {
          const res = await API.get('me/');
          setUser(res.data);
        } catch {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === 'admin' ? (
                <DashboardAdmin user={user} />
              ) : (
                <DashboardContributor user={user} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/projects/create" element={<ProjectCreate />} />
<Route path="/projects/edit/:id" element={<ProjectEdit />} />
<Route path="/projects/:id/tasks/create" element={<CreateTask />} />
<Route path="/projects/:id/tasks/assign" element={<AssignTask />} />
<Route path="/projects" element={<ProjectList />} />
<Route path="/projects/:id/tasks/lists" element={<TaskListByProject />} />


      </Routes>
    </Router>
  );
}

export default App;
