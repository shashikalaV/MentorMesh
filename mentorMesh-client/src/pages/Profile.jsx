import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={styles.page}>
      {user ? (
        <div style={styles.card}>
          
          {/* Profile Image */}
          <label style={{ cursor: "pointer" }}>
            <img
              src={image || "https://via.placeholder.com/120"}
              alt="profile"
              style={styles.image}
            />
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>

          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <p style={styles.bio}>
            Passionate learner 🚀 | Future Developer 💻
          </p>

          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <h2>Please Login First 🔐</h2>

          <button
            style={styles.button}
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #4F46E5, #9333EA)",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "3px solid #4F46E5",
  },
  bio: {
    marginTop: "10px",
    color: "#555",
    fontSize: "14px",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#4F46E5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Profile;