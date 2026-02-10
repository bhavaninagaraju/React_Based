import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch users
    fetch("http://localhost:60663/users")
      .then(res => res.json())
      .then(data => setUsers(data));

    // Fetch posts
    fetch("http://localhost:60663/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.firstName} {u.lastName} - {u.email}</li>
        ))}
      </ul>

      <h2>Posts</h2>
      <ul>
        {posts.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
