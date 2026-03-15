import React from "react";
import { Link, Outlet, useLocation } from "react-router";

const Dashboard = () => {
  const role = localStorage.getItem("userRole");
  const email = localStorage.getItem("userEmail");
  const location = useLocation();

  if (role !== "user") {
    window.location.href = "/";
    return null;
  }

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (active) => ({
    color: active ? "#0a74e9" : "#3a5a81",
    fontWeight: active ? "700" : "500",
    textDecoration: "none",
    display: "block",
    padding: "14px 20px",
    borderRadius: "12px",
    backgroundColor: active ? "rgba(10, 116, 233, 0.15)" : "transparent",
    boxShadow: active
      ? "0 4px 20px rgba(10, 116, 233, 0.3)"
      : "none",
    transition: "all 0.3s ease",
    fontSize: "1.05rem",
    userSelect: "none",
  });

  const getInitials = () => {
    if (!email) return "U";
    const parts = email.split("@")[0].split(".");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts.map(p => p.charAt(0).toUpperCase()).slice(0, 2).join("");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        background: "#f0f6fc",
      }}
    >
      {/* Sidebar */}
      <nav
        style={{
          width: "260px",
          background:
            "linear-gradient(135deg, #e5f0ff 60%, #cfe1fc 100%)",
          boxShadow:
            "6px 0 35px rgba(12, 72, 168, 0.12), inset 1px 0px 9px #d3e2fb",
          borderTopRightRadius: "44px",
          borderBottomRightRadius: "44px",
          padding: "40px 24px",
          position: "fixed",
          top: 0,
          bottom: 0,
          overflowY: "auto",
        }}
        aria-label="Dashboard sidebar"
      >
        <div
          style={{
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          <div
            title={email}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
              boxShadow: "0 6px 18px #3a7bd578",
              color: "white",
              fontWeight: "700",
              fontSize: 22,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",

              border: "2px solid #0c3d91",
              cursor: "default",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 10px 28px #3a7bd5cc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 18px #3a7bd578";
            }}
          >
            {getInitials()}
          </div>
          <h2
            style={{
              color: "#0c3d91",
              margin: 0,
              fontWeight: "700",
              fontSize: "1.85rem",
              letterSpacing: "1.3px",
            }}
          >
            Welcome
          </h2>
          <p
            style={{
              margin: 0,
              marginTop: 4,
              color: "#316bbd",
              fontWeight: "500",
              fontSize: "0.92rem",
              userSelect: "text",
              wordBreak: "break-word",
            }}
          >
            {email || "User"}
          </p>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li style={{ marginBottom: 18 }}>
            <Link
              to="/user/profile"
              style={navLinkStyle(isActive("/user/profile"))}
            >
              Profile
            </Link>
          </li>
          <li style={{ marginBottom: 18 }}>
            <Link
              to="/user/myexam"
              style={navLinkStyle(isActive("/user/myexam"))}
            >
              My Exams
            </Link>
          </li>

          <li style={{ marginBottom: 18 }}>
            <Link
              to="/user/myresult"
              style={navLinkStyle(isActive("/user/message"))}
            >
              Results
            </Link>
          </li>
          <li style={{ marginBottom: 18 }}>
            <Link
              to="/user/message"
              style={navLinkStyle(isActive("/user/message"))}
            >
              Message
            </Link>
          </li>
          <li style={{ marginBottom: 18 }}>
            <Link
              to="/user/changepassword"
              style={navLinkStyle(isActive("/user/changepassword"))}
            >
              Change Password
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userRole');
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main
        style={{
          marginLeft: 260,
          flexGrow: 1,
          minHeight: "100vh",
          padding: "20px 40px 48px 40px",
          background: "#f0f6fc",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        {/* Topbar */}
        <header
          style={{
            background: "#ffffffcc",
            borderRadius: "20px",
            padding: "20px 30px",
            boxShadow: "0 7px 20px rgba(58, 123, 213, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
            backdropFilter: "saturate(180%) blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 5,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.55rem",
              fontWeight: "700",
              color: "#0c3d91",
            }}
          >
            Good Evening, {email ? email.split("@")[0] : "User"} 👋
          </h1>
          <div
            title={email}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
              boxShadow: "0 6px 18px #3a7bd578",
              color: "white",
              fontWeight: "700",
              fontSize: 22,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",

              border: "2px solid #0c3d91",
              cursor: "default",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 10px 28px #3a7bd5cc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 18px #3a7bd578";
            }}
          >
            {getInitials()}
          </div>
        </header>

        {/* Content container */}
        <section
          style={{
            flexGrow: 1,
            background: "white",
            borderRadius: 24,
            padding: 30,
            boxShadow: "0 8px 40px rgba(74, 123, 255, 0.15)",
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
