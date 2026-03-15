import React, { useState } from 'react';
import { Link, Outlet } from 'react-router'; // Use react-router-dom

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const role = localStorage.getItem('role');
  if (role !== 'admin') window.location.href = '/adlogin';
  const email = localStorage.getItem('email');

  return (
    <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #e6f0fa; /* Light pastel sky blue */
          color: #333;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(90deg, #d9ecff 0%, #f6fbff 100%);
          transition: background 0.5s ease;
        }

        .sidebar {
          width: 260px;
          background: linear-gradient(135deg, #a3cdfd 20%, #70b5ff 90%);
          color: #1f3a72;
          padding: 30px 25px;
          transition: width 0.35s ease;
          box-shadow:
            inset 2px 2px 8px #d6e9ffcc,
            3px 0 15px #a0c0ffcc;
          border-top-right-radius: 40px;
          border-bottom-right-radius: 40px;
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        .collapsed .sidebar {
          width: 80px;
          padding: 25px 12px;
          box-shadow:
            inset 2px 2px 10px #e7f1ffcc,
            2px 0 10px #9bbcff88;
        }

        .sidebar-header {
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
          color: #173e86;
          letter-spacing: 2px;
          user-select: none;
          transition: font-size 0.3s ease, opacity 0.35s ease;
          text-shadow: 0 1px 3px rgba(0, 80, 180, 0.4);
        }

        .collapsed .sidebar-header {
          font-size: 1.5rem;
          margin-bottom: 20px;
          opacity: 0.7;
        }

        .nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
        }

        .nav-links li {
          margin-bottom: 20px;
          transition: all 0.25s ease;
        }

        .nav-links li:last-child {
          margin-top: auto;
          margin-bottom: 0;
        }

        .nav-links a {
          display: block;
          padding: 14px 20px;
          color: #16407a;
          font-weight: 600;
          border-radius: 14px;
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow:
            inset 2px 2px 8px #e3f0ffcc,
            inset -2px -2px 8px #a3c1ffcc;
          transition:
            background-color 0.3s ease,
            box-shadow 0.3s ease,
            padding-left 0.3s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
        }

        .nav-links a:hover {
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow:
            6px 6px 18px #9fc7ffcc,
            inset 4px 4px 12px #f5faffcc;
          padding-left: 32px;
          cursor: pointer;
          color: #0e2f64;
        }

        .collapsed .nav-links a {
          padding: 14px 12px;
          font-size: 0;
          text-indent: -9999px;
          overflow: hidden;
          pointer-events: none;
        }

        .collapsed .nav-links li:hover a {
          pointer-events: auto;
          position: relative;
          font-size: 1rem;
          text-indent: 0;
          white-space: normal;
          background-color: rgba(255, 255, 255, 0.95);
          padding-left: 18px;
          box-shadow:
            6px 6px 22px #adc8ffcc,
            inset 6px 6px 10px #f8fdffcc;
          border-radius: 14px;
          color: #164b94;
          z-index: 10;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow:
            inset 0 0 40px #d2e5ffcc,
            5px 0 15px #aec1f9cc;
          border-radius: 0 36px 36px 0;
          overflow: auto;
          min-height: 100vh;
          transition: background 0.5s ease;
          user-select: text;
        }

        .topbar {
          background-color: #fefeff;
          padding: 26px 44px;
          border-bottom: 1px solid #d3dce8;
          box-shadow: 0 1px 5px rgba(0,0,0,0.03);
          border-radius: 0 36px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
        }

        .toggle-btn {
          padding: 12px 32px;
          border: none;
          background: linear-gradient(135deg, #9abfff 35%, #71c6ff 90%);
          color: #1c3c72;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 4px 14px #88a9ea;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .toggle-btn:hover {
          background: linear-gradient(135deg, #84a8f6 35%, #4ea8ff 90%);
          box-shadow: 0 6px 22px #5d83e0cc;
          transform: scale(1.07);
        }

        .content {
          padding: 50px 64px;
          border-radius: 26px;
          margin: 44px 72px 70px 72px;
          background-color: #fcfcff;
          box-shadow:
            0 30px 66px rgba(144, 180, 249, 0.25),
            inset 0 0 50px #c1d4ff;
          color: #255083;
          font-weight: 600;
          font-size: 1.12rem;
          overflow-y: auto;
          transition: padding 0.35s ease, margin 0.35s ease;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .collapsed .content {
          margin-left: 32px;
          padding: 36px 40px;
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            border-radius: 0;
            box-shadow: none;
            flex-direction: row;
            justify-content: space-around;
            padding: 18px 12px;
          }
          .collapsed .sidebar {
            width: 100%;
          }
          .collapsed .sidebar-header {
            font-size: 1.5rem;
            opacity: 1;
          }
          .collapsed .nav-links a {
            font-size: 1rem;
            text-indent: 0;
            pointer-events: auto;
            padding: 12px;
          }
          .main {
            background-color: #fff;
            border-radius: 0;
            box-shadow: none;
            min-height: auto;
          }
          .content {
            margin: 24px 24px 48px 24px;
            padding: 24px 28px;
          }
          .topbar {
            padding: 20px 32px;
          }
          .topbar h2 {
            font-size: 1.3rem;
          }
          .toggle-btn {
            padding: 10px 24px;
            font-size: 1rem;
            box-shadow: none;
          }
        }
      `}</style>

      <nav className="sidebar" aria-label="Sidebar navigation">
        <div className="sidebar-header" aria-label="Sidebar header">
          {collapsed ? 'A' : 'Admin'}
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/admin/session" tabIndex={collapsed ? -1 : 0}>
              Session
            </Link>
          </li>
          <li>
            <Link to="/admin/subject" tabIndex={collapsed ? -1 : 0}>
              Subject
            </Link>
          </li>
          <li>
            <Link to="/admin/examinee" tabIndex={collapsed ? -1 : 0}>
              Examinee
            </Link>
          </li>
          <li>
            <Link to="/admin/questions" tabIndex={collapsed ? -1 : 0}>
              Question Bank
            </Link>
          </li>
          <li>
            <Link to="/admin/exams" tabIndex={collapsed ? -1 : 0}>
              Examination
            </Link>
          </li>
          <li>
            <Link to="/admin/resultdeclaration" tabIndex={collapsed ? -1 : 0}>
              Result
            </Link>
          </li>
          <li>
            <Link to="/admin/result" tabIndex={collapsed ? -1 : 0}>
              Declare Result
            </Link>
          </li>
          <li>
            <Link to="/admin/changepassword" tabIndex={collapsed ? -1 : 0}>
              Change Password
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={() => {
                localStorage.clear();
                window.location.href = '/adlogin';
              }}
              tabIndex={collapsed ? -1 : 0}
              aria-label="Logout"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      <main className="main" role="main">
        <header className="topbar" aria-label="Topbar">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="toggle-btn"
            aria-expanded={!collapsed}
            aria-controls="sidebar"
            aria-label={collapsed ? 'Expand Menu' : 'Collapse Menu'}
          >
            {collapsed ? 'Show Menu' : 'Hide Menu'}
          </button>
          <h2 tabIndex="0">Welcome, {email}</h2>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
