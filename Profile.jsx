import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const nameFromEmail = localStorage.getItem("userEmail") || "";
    setUser({
      name: nameFromEmail.split("@")[0].replace('.', ' ').toUpperCase() || "User",
      email: nameFromEmail,
      phone: "+91 9876543210",
      role: localStorage.getItem("userRole") || "User",
      avatarUrl: "",
    });
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatarWrapper}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile Avatar" style={styles.avatarImg} />
            ) : (
              <div style={styles.avatarLetters}>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.role}>{user.role}</p>
        </div>
        <div style={styles.infoSection}>
          <h3 style={styles.sectionTitle}>Contact Information</h3>
          <div style={styles.infoRow}>
            <label style={styles.label}>Email</label>
            <p style={styles.value}>{user.email}</p>
          </div>
          <div style={styles.infoRow}>
            <label style={styles.label}>Phone</label>
            <p style={styles.value}>{user.phone}</p>
          </div>
        </div>
        <div style={styles.infoSection}>
          <h3 style={styles.sectionTitle}>Settings</h3>
          <div style={styles.infoRow}>
            <label style={styles.label}>Change Password</label>
            <button
              style={styles.button}
              onClick={() => window.location.href = "/user/changepassword"}
            >
              Change
            </button>
          </div>
          <div style={styles.infoRow}>
            <label style={styles.label}>Logout</label>
            <button
              style={{ ...styles.button, backgroundColor: "#e04848", backgroundImage: "none" }}
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f0ff, #f6fafc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: 420,
    maxWidth: "100%",
    background: "rgba(255,255,255,0.95)",
    borderRadius: 28,
    boxShadow: "0 10px 38px #8bbef799, 0 4.5px 22px #aed7fe6a",
    padding: 36,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    textAlign: "center",
    marginBottom: 26,
  },
  avatarWrapper: {
    margin: "0 auto 12px",
    width: 90,
    height: 90,
    borderRadius: 16,
    overflow: "hidden",
    background: "linear-gradient(135deg, #6a9bf8, #63c9ff)",
    boxShadow: "0 2px 16px #7cc8ff55",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 36,
    color: "#fff",
    fontWeight: "700",
    userSelect: "none",
  },
  avatarImg: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  avatarLetters: {
    userSelect: "none",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#20427d",
    margin: "0 0 2px 0",
    letterSpacing: "1px",
  },
  role: {
    fontSize: 15,
    fontWeight: "500",
    color: "#5596e6",
    margin: 0,
    userSelect: "none",
    letterSpacing: ".7px",
  },
  infoSection: {
    marginBottom: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3689ce",
    marginBottom: 10,
    letterSpacing: ".7px",
    borderBottom: "1.8px solid #b9d9fe",
    paddingBottom: 5,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    userSelect: "none",
    width: "100%",
  },
  label: {
    fontWeight: "600",
    fontSize: 15,
    color: "#3c547b",
  },
  value: {
    fontWeight: "500",
    fontSize: 15,
    color: "#4f6380",
    wordBreak: "break-all",
    textAlign: "right",
    marginLeft: 10,
    flex: 1,
  },
  button: {
    padding: "7px 24px",
    background: "linear-gradient(135deg, #4a85f7 20%, #38caf9 90%)",
    color: "#fff",
    fontSize: 13.5,
    fontWeight: "700",
    border: "none",
    borderRadius: 20,
    cursor: "pointer",
    userSelect: "none",
    boxShadow: "0 3px 15px #86dfff75",
    transition: "background 0.23s, background-color 0.23s",
    marginLeft: 6,
  },
};

export default Profile;
