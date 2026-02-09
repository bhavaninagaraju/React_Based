import { USER_FORM_SCHEMA } from '../config/userFormSchema.js';

/**
 * Validate form values against the schema.
 * Returns an object of field name -> error message (empty string if valid).
 */
export function validateForm(values) {
  const errors = {};

  for (const field of USER_FORM_SCHEMA) {
    const value = (values[field.name] ?? '').trim();
    let msg = '';

    if (field.required && !value) {
      msg = field.validation?.message ?? `${field.label} is required`;
    } else if (value && field.validation?.pattern && !field.validation.pattern.test(value)) {
      msg = field.validation.message;
    } else if (value && field.validation?.minLength !== undefined && value.length < field.validation.minLength) {
      msg = field.validation.message;
    }

    if (msg) errors[field.name] = msg;
  }

  return errors;
}

/**
 * Build initial empty values from schema
 */
export function getInitialValues(existing = {}) {
  const initial = {};
  for (const field of USER_FORM_SCHEMA) {
    initial[field.name] = existing[field.name] ?? '';
  }
  return initial;
}
