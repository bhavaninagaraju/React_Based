import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box } from '@mui/material';
import UserList from './components/UserList.jsx';
import UserModal from './components/UserModal.jsx';
import * as usersApi from './api/usersApi.js';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f5f5f5' },
  },
});

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersApi.fetchUsers();
      setUsers(data);
    } catch (e) {
      setError(e.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSave = async (payload) => {
    try {
      if (editingUser) {
        await usersApi.updateUser(editingUser.id, payload);
      } else {
        await usersApi.createUser(payload);
      }
      await loadUsers();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.firstName} ${user.lastName}?`)) return;
    try {
      await usersApi.deleteUser(user.id);
      await loadUsers();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          User Management
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Create, read, update, and delete user records.
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
          <UserList
            users={users}
            loading={loading}
            error={error}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          user={editingUser}
          onSave={handleSave}
        />
      </Container>
    </ThemeProvider>
  );
}
