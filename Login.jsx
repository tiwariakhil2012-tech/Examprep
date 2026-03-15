import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [data, fromData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    fromData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/examinee/login', data);
      if (res.data.message === "Login Successfully") {
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        window.location.href = '/user/';
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h3>Welcome Back</h3>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>

      <style>{`
        /* Full viewport with subtle blue-gray gradient */
        .login-wrapper {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #dae9f7, #c4d4ec);
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Glassmorphic login card */
        .login-form {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
          padding: 40px 38px;
          width: 100%;
          max-width: 420px;
          color: #112d4e;
          display: flex;
          flex-direction: column;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .login-form:hover {
          transform: scale(1.04);
          box-shadow: 0 12px 48px rgba(31, 38, 135, 0.25);
        }

        /* Heading */
        .login-form h3 {
          margin-bottom: 30px;
          font-size: 2.4rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-align: center;
          color: #0e223d;
          text-shadow: 0 1px 4px rgba(14, 34, 61, 0.3);
        }

        /* Labels */
        .form-label {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 8px;
          color: #0f395c;
          letter-spacing: 0.6px;
          display: block;
        }

        /* Inputs with neumorphic style */
        .form-control {
          padding: 14px 18px;
          border-radius: 16px;
          border: none;
          outline: none;
          width: 100%;
          font-size: 1rem;
          font-weight: 500;
          background: #e3ecf9;
          box-shadow:
            inset 6px 6px 10px #bdd1f7,
            inset -6px -6px 10px #ffffff;
          color: #0e223d;
          transition: all 0.35s ease;
          margin-bottom: 22px;
          font-family: inherit;
        }

        .form-control::placeholder {
          color: #9bb7d4;
          font-weight: 400;
        }

        .form-control:focus {
          box-shadow:
            inset 3px 3px 6px #a5bbdb,
            inset -3px -3px 6px #f5fcff;
          background: #f0f6ff;
          color: #093360;
        }

        /* Button with gradient & subtle shadow */
        .btn-primary {
          margin-top: 8px;
          background: linear-gradient(135deg, #4b79a1, #283e51);
          color: #d2e2fc;
          padding: 14px 0;
          font-size: 1.15rem;
          font-weight: 700;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 5px 16px rgba(34, 51, 85, 0.7);
          transition: background 0.3s ease, box-shadow 0.3s ease;
          font-family: inherit;
          letter-spacing: 0.6px;
          user-select: none;
        }
        .btn-primary:hover,
        .btn-primary:focus {
          background: linear-gradient(135deg, #6a99cc, #405977);
          box-shadow: 0 8px 24px rgba(45, 68, 110, 0.95);
          outline: none;
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .login-form {
            padding: 30px 28px;
            max-width: 320px;
          }
          .login-form h3 {
            font-size: 1.8rem;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
