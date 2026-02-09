import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import UserForm from './UserForm.jsx';
import { validateForm, getInitialValues } from '../utils/validation.js';

export default function UserModal({ open, onClose, user, onSave }) {
  const [values, setValues] = useState(getInitialValues());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setValues(getInitialValues(user ?? {}));
      setErrors({});
    }
  }, [open, user]);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    const nextErrors = validateForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    const payload = { ...values };
    onSave(payload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
        <UserForm values={values} errors={errors} onChange={handleChange} />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {user ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
