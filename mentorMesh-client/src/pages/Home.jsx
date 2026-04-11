function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to MentorMesh 👋</h1>
      <p>Connect. Learn. Grow.</p>

      <div style={styles.card}>
        <h3>🔥 Start Learning Today</h3>
        <p>Find people who can teach you skills.</p>
      </div>

      <div style={styles.card}>
        <h3>🎯 Teach What You Know</h3>
        <p>Share your skills and build your reputation.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default Home;