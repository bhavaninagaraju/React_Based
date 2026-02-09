import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { USER_FORM_SCHEMA } from '../config/userFormSchema.js';

export default function UserList({ users, loading, error, onAdd, onEdit, onDelete }) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}. Make sure the API server is running (npm run server).
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Users</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {USER_FORM_SCHEMA.map((f) => (
                <TableCell key={f.name}>{f.label}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={USER_FORM_SCHEMA.length + 1} align="center">
                  No users yet. Click &quot;Add User&quot; to create one.
                </TableCell>
              </TableRow>
            ) : (
              users.map((row) => (
                <TableRow key={row.id}>
                  {USER_FORM_SCHEMA.map((f) => (
                    <TableCell key={f.name}>{row[f.name] ?? '-'}</TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => onEdit(row)} aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => onDelete(row)} aria-label="Delete" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
