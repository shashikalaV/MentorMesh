import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update subscription
  const updatePlan = async (id, plan) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscription: plan }),
    });

    fetchUsers();
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      {users.map((user) => (
        <div key={user._id} style={styles.card}>
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>
          <p>Plan: {user.subscription}</p>

          <select
            onChange={(e) => updatePlan(user._id, e.target.value)}
            defaultValue={user.subscription}
          >
            <option value="free">Free</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};

export default Admin;