import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const TaskListByProject = () => {
  const { id } = useParams();
  const [projectTitle, setProjectTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch project title
    API.get(`projects/${id}/`)
      .then(res => setProjectTitle(res.data.title))
      .catch(() => setProjectTitle(`Project #${id}`));

    // Fetch tasks
    API.get('tasks/')
      .then(res => {
        const taskList = res.data.results || res.data; // handle pagination or non-paginated
        const projectTasks = taskList.filter(task => task.project.id === parseInt(id));
        setTasks(projectTasks);
        setFilteredTasks(projectTasks);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch tasks');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const now = new Date();
    const filtered = tasks.filter(task => {
      const dueDate = new Date(task.due_date);
      const createdAt = new Date(task.created_at);

      if (filter === 'overdue') {
        return dueDate < now && task.status !== 'done';
      } else if (filter === 'due_soon') {
        const in48h = new Date();
        in48h.setHours(in48h.getHours() + 48);
        return dueDate >= now && dueDate <= in48h && task.status !== 'done';
      } else if (filter === 'recently_completed') {
        const past24h = new Date();
        past24h.setHours(past24h.getHours() - 24);
        return task.status === 'done' && createdAt >= past24h;
      } else {
        return true;
      }
    });

    setFilteredTasks(filtered);
  }, [filter, tasks]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Tasks for Project: <span style={{ color: '#007bff' }}>{projectTitle}</span></h2>

      <div style={styles.filterContainer}>
        <label><strong>Filter:</strong></label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.select}>
          <option value="all">All Tasks</option>
          <option value="overdue">Overdue</option>
          <option value="due_soon">Due in 48 Hours</option>
          <option value="recently_completed">Recently Completed (24h)</option>
        </select>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks match this filter.</p>
      ) : (
        filteredTasks.map(task => (
          <div key={task.id} style={styles.card}>
            <h4 style={{ marginBottom: '0.5rem' }}>{task.title}</h4>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleString()}</p>
            <p><strong>Assigned To:</strong> {task.assigned_to ? task.assigned_to.username.split('@')[0] : 'Not Assigned'}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.6rem',
  },
  filterContainer: {
    marginBottom: '1.5rem',
  },
  select: {
    marginLeft: '0.5rem',
    padding: '0.4rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  }
};

export default TaskListByProject;
