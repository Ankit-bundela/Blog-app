import React, { useState } from "react";
import Login from "./components/Login";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div style={styles.app}>

      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>📝 Blog App</h1>

        {token && (
          <button style={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        )}
      </header>

      {/* LOGIN */}
      {!token && (
        <div style={styles.card}>
          <Login setToken={handleLogin} />
        </div>
      )}

      {/* CREATE POST */}
      {token && (
        <div style={styles.card}>
          <CreatePost token={token} />
        </div>
      )}

      {/* POSTS */}
      <div style={styles.card}>
        <Posts />
      </div>

    </div>
  );
}

const styles = {
  app: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },

  card: {
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },

  logoutBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default App;