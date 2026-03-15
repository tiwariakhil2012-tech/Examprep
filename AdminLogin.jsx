import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', form);

      if (res.data.message === 'Login successfully') {
        localStorage.setItem('role', res.data.admin.role);
        localStorage.setItem('email', res.data.admin.email);
        window.location.href = '/admin';
      } else {
        window.alert('Your email or password are incorrect');
      }
    } catch (error) {
      window.alert('An error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <>
      <style>{`
        /* Body background gradient with lighter blues */
        .bg-glass-blue {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #a3c9ff, #d0e5ff);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }

        /* Glassmorphic card container - lighter, more translucent */
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 20px;
          box-shadow:
            0 8px 32px 0 rgba(135, 178, 255, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 40px 30px;
          max-width: 400px;
          width: 100%;
          color: #204a87;
          text-align: center;
          user-select: none;
        }

        /* Title with softer light blue */
        .glass-card h3 {
          margin-bottom: 30px;
          font-weight: 700;
          font-size: 2rem;
          color: #507fe2;
          text-shadow: 0 0 12px rgba(120, 160, 255, 0.8);
        }

        /* Input labels */
        .glass-card label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a6fb3;
          text-align: left;
          font-size: 0.95rem;
          user-select: text;
        }

        /* Input fields: lighter backgrounds and colors */
        .glass-card input[type="email"],
        .glass-card input[type="password"] {
          width: 100%;
          padding: 12px 15px;
          border-radius: 12px;
          border: 1.5px solid rgba(120, 160, 255, 0.5);
          background: rgba(240, 248, 255, 0.8);
          color: #2c4f8d;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          outline: none;
          box-sizing: border-box;
          margin-bottom: 20px;
          backdrop-filter: blur(6px);
          user-select: text;
        }

        .glass-card input[type="email"]::placeholder,
        .glass-card input[type="password"]::placeholder {
          color: #8aaadc99;
        }

        .glass-card input[type="email"]:focus,
        .glass-card input[type="password"]:focus {
          border-color: #79a4ff;
          box-shadow: 0 0 12px #79a4ffbb;
          background: rgba(255, 255, 255, 0.95);
          color: #1a306a;
        }

        /* Submit button with lighter blue gradient and glow */
        .glass-card button {
          width: 100%;
          padding: 13px;
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          background: linear-gradient(135deg, #7ca5ff, #5185f7);
          border: none;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(90, 130, 255, 0.75);
          transition: background 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }

        .glass-card button:hover,
        .glass-card button:focus {
          background: linear-gradient(135deg, #5185f7, #3a67d6);
          box-shadow: 0 8px 28px rgba(58, 103, 214, 0.85);
          outline: none;
        }

        /* Register link with light blue tint */
        .glass-card p {
          margin-top: 18px;
          color: #5d7db8;
          font-size: 0.9rem;
          user-select: text;
        }

        .glass-card p a {
          color: #7ca5ff;
          font-weight: 600;
          text-decoration: none;
          margin-left: 5px;
          transition: color 0.3s ease;
          user-select: text;
        }

        .glass-card p a:hover,
        .glass-card p a:focus {
          color: #5185f7;
          text-decoration: underline;
          outline: none;
        }

        /* Responsive tweaks */
        @media (max-width: 480px) {
          .glass-card {
            padding: 30px 20px;
            max-width: 100%;
          }

          .glass-card h3 {
            font-size: 1.7rem;
          }
        }
      `}</style>

      <div className="bg-glass-blue">
        <div className="glass-card shadow">
          <h3>Admin Login</h3>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />

            <button type="submit">Login</button>
          </form>
          <p>
            Don't have any account?
            <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
