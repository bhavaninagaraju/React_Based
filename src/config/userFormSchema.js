/**
 * Schema-driven form configuration for user data.
 * Add new fields by extending this array - no major UI or logic rewrites needed.
 *
 * Each field supports:
 * - name: API key (camelCase)
 * - label: Display label
 * - type: 'text' | 'email' | 'tel'
 * - required: boolean
 * - validation: { pattern, message } for custom regex validation
 */

export const USER_FORM_SCHEMA = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    validation: {
      minLength: 1,
      message: 'First name is required',
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    validation: {
      minLength: 1,
      message: 'Last name is required',
    },
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'text',
    required: false,
    validation: {
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      message: 'Use YYYY-MM-DD format',
    },
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
];

/**
 * Get API base URL - uses proxy in dev, env var in production
 */
export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:56275";
};
