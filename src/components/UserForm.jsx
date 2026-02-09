import { TextField, Grid, Box } from '@mui/material';
import { USER_FORM_SCHEMA } from '../config/userFormSchema.js';

/**
 * Schema-driven form component. Renders fields from USER_FORM_SCHEMA.
 * Adding new fields in the schema automatically adds them to this form.
 */
export default function UserForm({ values, errors, onChange }) {
  return (
    <Box component="form" noValidate sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {USER_FORM_SCHEMA.map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              fullWidth
              name={field.name}
              label={field.label}
              type={field.type}
              value={values[field.name] ?? ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
              required={field.required}
              autoComplete={field.name === 'email' ? 'email' : 'off'}
              inputProps={
                field.type === 'tel'
                  ? { pattern: field.validation?.pattern?.source, maxLength: 20 }
                  : undefined
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
