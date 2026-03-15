import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    college: '',
    qualification: '',
    session: '',
    password: '',
  });

  const [session, setSession] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/session/');
      setSession(res.data.data);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/examinee', formData);
      alert('Examinee Registered!');
      setFormData({
        name: '',
        email: '',
        number: '',
        address: '',
        college: '',
        qualification: '',
        session: '',
        password: '',
      });
    } catch (error) {
      console.error('Submission error', error);
      alert('Failed to register');
    }
  };

  return (
    <>
      <style>{`
        /* Overall container */
        .registration-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 70%, #90caf9 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 15px;
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          box-sizing: border-box;
        }
        
        /* Form wrapper */
        .registration-box {
          background: #ffffffee;
          width: 100%;
          max-width: 960px;
          border-radius: 28px;
          box-shadow:
            0 12px 20px rgba(79, 117, 189, 0.24),
            0 5px 10px rgba(79, 117, 189, 0.12);
          padding: 40px 50px;
          border: 1.5px solid #a1c4fd;
          transition: box-shadow 0.3s ease;
        }
        .registration-box:hover {
          box-shadow:
            0 20px 40px rgba(79, 117, 189, 0.3),
            0 10px 20px rgba(79, 117, 189, 0.16);
        }

        /* Header */
        .registration-header {
          font-size: 2.7rem;
          font-weight: 900;
          color: #3367d6;
          margin-bottom: 1.8rem;
          letter-spacing: 0.15rem;
          text-align: center;
          user-select: none;
          text-shadow: 0 3px 8px rgba(51, 103, 214, 0.35);
          font-family: 'Poppins', sans-serif;
        }

        /* Form groups */
        .form-label {
          font-weight: 600;
          font-size: 1.05rem;
          margin-bottom: 8px;
          display: block;
          color: #2e4486;
          user-select: text;
          letter-spacing: 0.04em;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        input.form-control,
        select.form-select {
          width: 100%;
          padding: 13px 18px;
          border-radius: 14px;
          border: 2px solid #d0e1fd;
          background: #f6fbff;
          font-size: 1.05rem;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
          color: #2a3b72;
          font-weight: 500;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-shadow:
            inset 4px 4px 8px #d0e1fd,
            inset -4px -4px 8px white;
          user-select: text;
          outline-offset: 2px;
        }
        input.form-control:focus,
        select.form-select:focus {
          outline: none;
          border-color: #3f6feb;
          box-shadow:
            0 0 10px #5f86ff88,
            inset 4px 4px 8px #b4c6fd,
            inset -4px -4px 8px #e6f0ff;
          background: #edf5ff;
          color: #1a2a6d;
          font-weight: 600;
        }
        input::placeholder {
          color: #9bb7df;
          font-weight: 400;
          font-style: italic;
        }

        /* Row gap and columns */
        .row.g-4 {
          gap: 1.9rem 2.8rem;
        }

        /* Button */
        button.btn-primary {
          background: linear-gradient(135deg, #4d94ff, #3366cc);
          border: none;
          font-size: 1.25rem;
          padding: 14px 0;
          font-weight: 700;
          border-radius: 18px;
          transition: background 0.4s ease, box-shadow 0.4s ease, transform 0.2s ease;
          box-shadow: 0 6px 18px rgba(51, 102, 204, 0.45);
          color: white;
          user-select: none;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          width: 100%;
        }
        button.btn-primary:hover,
        button.btn-primary:focus {
          background: linear-gradient(135deg, #3a6bbf, #224d91);
          box-shadow: 0 10px 28px rgba(33, 61, 132, 0.65);
          transform: translateY(-3px);
          outline: none;
        }

        /* Link below form */
        p.mt-4.text-center {
          font-size: 1.03rem;
          color: #4567ad;
          user-select: text;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        p.mt-4.text-center a {
          color: #3385ff;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.4s ease;
          user-select: text;
        }
        p.mt-4.text-center a:hover,
        p.mt-4.text-center a:focus {
          color: #224d91;
          text-decoration: underline;
          outline: none;
        }

        /* Responsive tweaks */
        @media (max-width: 991px) {
          .registration-box {
            padding: 30px 35px;
          }
          .registration-header {
            font-size: 2.2rem;
            letter-spacing: 0.1rem;
          }
        }
        @media (max-width: 575px) {
          .row.g-4 {
            gap: 1.5rem 1.5rem;
          }
          .registration-box {
            padding: 25px 20px;
            border-radius: 20px;
          }
          .registration-header {
            font-size: 1.85rem;
            letter-spacing: 0.07rem;
          }
          input.form-control,
          select.form-select {
            font-size: 1rem;
            padding: 12px 14px;
            border-radius: 12px;
          }
          button.btn-primary {
            font-size: 1.1rem;
            padding: 12px 0;
          }
        }
      `}</style>

      <div className="registration-container">
        <div className="registration-box shadow-lg">
          <h2 className="registration-header">Student Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control border-primary"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control border-primary"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    id="phone"
                    className="form-control border-primary"
                    placeholder="e.g. +91 98765xxxxx"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control border-primary"
                    placeholder="Your current address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    autoComplete="street-address"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="college" className="form-label">
                    College
                  </label>
                  <input
                    type="text"
                    name="college"
                    id="college"
                    className="form-control border-primary"
                    placeholder="College name"
                    value={formData.college}
                    onChange={handleChange}
                    required
                    autoComplete="organization"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="qualification" className="form-label">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    id="qualification"
                    className="form-control border-primary"
                    placeholder="e.g. B.Tech, MBA..."
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="session" className="form-label">
                    Session
                  </label>
                  <select
                    name="session"
                    id="session"
                    className="form-select border-primary"
                    value={formData.session}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Session
                    </option>
                    {session.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control border-primary"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    minLength={6}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary fw-semibold">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
          <p className="mt-4 text-center">
            Already registered?{' '}
            <a href="/login" className="text-decoration-none fw-semibold">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
