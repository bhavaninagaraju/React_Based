


const isGithubPages = window.location.hostname.includes("github.io");

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : isGithubPages
      ? "https://your-api.onrender.com"
      : "");

console.log("MODE =", import.meta.env.MODE);
console.log("API BASE =", API_BASE);

if (!API_BASE) {
  console.error("API not available");
}

/**
 * Fetch all users
 */
export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

/**
 * Fetch a single user by ID
 */
export async function fetchUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

/**
 * Create a new user
 */
export async function createUser(user) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

/**
 * Update an existing user
 */
export async function updateUser(id, user) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

/**
 * Delete a user
 */
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
}
