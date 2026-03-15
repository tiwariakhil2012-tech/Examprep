import React, { useState, useEffect } from "react";
import axios from "axios";

const Session = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [data, setData] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState("");

  // Handle form inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit for add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editForm) {
        const res = await axios.put(`http://localhost:5000/api/session/${id}`, form);
        if (res) {
          alert("Session edited Successfully");
          resetForm();
          fetchSessions();
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/session", form);
        if (res) {
          alert("Session added Successfully");
          resetForm();
          fetchSessions();
        }
      }
    } catch (err) {
      alert("Sorry, try again");
    }
  };

  // Reset form state
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    setEditForm(false);
    setId("");
  };

  // Fetch all sessions
  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session");
      setData(res.data.data);
    } catch {
      setData([]);
      alert("Failed to fetch sessions");
    }
  };

  // Delete session by id
  const handleDelete = async (idToDelete) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/session/${idToDelete}`);
      if (res) {
        alert("Deleted successfully");
        fetchSessions();
      }
    } catch {
      alert("Try again later");
    }
  };

  // Prepare form for editing existing session
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      startDate: item.startDate || "",
      endDate: item.endDate || "",
    });
    setEditForm(true);
    setId(item._id);
  };

  // Load sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="session-container">
      <style>{`
        .session-container {
          background: linear-gradient(120deg, #e6f0ff, #f6faff);
          min-height: 100vh;
          padding: 2rem 1rem;
          font-family: "Poppins", sans-serif;
          color: #1a2e65;
          user-select: none;
        }
        .glass-card {
          background: rgba(255 255 255 / 0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 20px;
          border: 1.5px solid rgba(255 255 255 / 0.3);
          box-shadow:
            0 8px 30px rgba(0 0 0 / 0.08),
            inset 4px 4px 10px rgba(255 255 255 / 0.5),
            inset -4px -4px 10px rgba(182 211 251 / 0.5);
          padding: 30px;
          margin-bottom: 2rem;
          transition: box-shadow 0.3s ease;
        }
        .glass-card:hover {
          box-shadow:
            0 12px 40px rgba(0,0,0,0.12),
            inset 5px 5px 12px rgba(255,255,255,0.6),
            inset -5px -5px 12px rgba(170, 200, 255, 0.7);
        }
        label {
          font-weight: 600;
          color: #2c3e8f;
          margin-bottom: 8px;
          display: block;
          user-select: text;
        }
        input.form-control,
        textarea.form-control {
          background-color: rgba(255 255 255 / 0.7);
          border: 2.5px solid #a3bee9;
          border-radius: 15px;
          padding: 10px 14px;
          font-size: 1rem;
          color: #1a2e65;
          box-shadow:
            inset 1.5px 1.5px 6px rgba(255 255 255 / 0.85),
            inset -1.5px -1.5px 6px rgba(160 190 250 / 0.9);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          outline: none;
        }
        input.form-control:focus,
        textarea.form-control:focus {
          border-color: #638cec;
          box-shadow:
            0 0 8px 2px #699ffa,
            inset 1.5px 1.5px 8px rgba(255 255 255 / 0.95);
          background-color: #f5faff;
          color: #1355c1;
        }
        .glass-btn {
          background: linear-gradient(135deg, #6294f7 0%, #3679f8 90%);
          color: white;
          border: none;
          border-radius: 15px;
          box-shadow:
            0 6px 15px rgba(54 121 243 / 0.6);
          padding: 13px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          width: 100%;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }
        .glass-btn:hover {
          background: linear-gradient(135deg, #3a6df8 0%, #2e65f7 100%);
          box-shadow:
            0 9px 24px rgba(37 88 255 / 0.85);
          transform: scale(1.05);
        }
        .table-wrapper {
          background-color: rgba(255 255 255 / 0.8);
          border-radius: 25px;
          box-shadow: 0 12px 48px rgba(104 135 242 / 0.18);
          padding: 20px 0;
          overflow-x: auto;
          user-select: text;
        }
        table {
          width: 100%;
          color: #26427b;
          font-weight: 600;
          border-collapse: separate;
          border-spacing: 0 16px;
          text-align: center;
        }
        thead tr th {
          color: #3d5693;
          background: linear-gradient(90deg, #a2b9f8 15%, #7595ff 100%);
          padding: 15px;
          font-size: 1.1rem;
          border-radius: 18px 18px 0 0;
          user-select: text;
          box-shadow: inset 0 0 8px rgba(255 255 255 / 0.65);
        }
        tbody tr {
          background: #f0f6ff;
          box-shadow: 0 6px 20px rgba(81 113 223 / 0.18);
          border-radius: 18px;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        tbody tr:hover {
          background: #dcedff;
          box-shadow: 0 10px 30px rgba(68 104 226 / 0.3);
          cursor: pointer;
        }
        tbody tr td {
          padding: 18px 12px;
          user-select: text;
          font-size: 1rem;
        }
        .btn-info,
        .btn-danger {
          border-radius: 15px;
          font-weight: 600;
          padding: 8px 14px;
          min-width: 90px;
          user-select: none;
          transition: background 0.3s ease;
        }
        .btn-info {
          background: linear-gradient(135deg, #60a8ff 0%, #2d7ef7 100%);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(42 113 243 / 0.7);
        }
        .btn-info:hover {
          background: linear-gradient(135deg, #5580eb 0%, #214fcf 100%);
          box-shadow: 0 6px 24px rgba(32 90 202 / 0.85);
        }
        .btn-danger {
          background: linear-gradient(135deg, #f76e6e 0%, #f24e4e 100%);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(247 110 110 / 0.7);
        }
        .btn-danger:hover {
          background: linear-gradient(135deg, #e04848 0%, #d22323 100%);
          box-shadow: 0 6px 24px rgba(208 35 35 / 0.85);
        }
        @media (max-width: 768px) {
          .session-container {
            padding: 1.5rem;
          }
          .glass-card {
            padding: 20px;
          }
          table {
            font-size: 0.9rem;
          }
          thead tr th {
            font-size: 0.9rem;
          }
          tbody tr td {
            padding: 14px 8px;
          }
          .btn-info,
          .btn-danger {
            min-width: 75px;
            padding: 6px 10px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <h1 className="text-center" style={{ color: "#25427b", marginBottom: "1.5rem" }}>
        <i className="fa-solid fa-calendar-plus me-2"></i> Add Session
      </h1>

      <div className="container">
        <div className="glass-card mb-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Session Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                placeholder="Enter session name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description">Session Description</label>
              <textarea
                id="description"
                className="form-control"
                name="description"
                placeholder="Enter session description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="glass-btn" aria-label={editForm ? "Update Session" : "Add Session"}>
                {editForm ? (
                  <>
                    <i className="fa-solid fa-pen-to-square me-2"></i> Update Session
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-plus me-2"></i> Add Session
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="table-wrapper" aria-label="Session List Table">
          <h4
            className="text-center"
            style={{ color: "#5a6f9a", marginBottom: "1.25rem", userSelect: "none" }}
          >
            <i className="fa-solid fa-table-list me-2"></i> Session List
          </h4>
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>User Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger me-2"
                          onClick={() => handleDelete(item._id)}
                          aria-label={`Delete session ${item.name}`}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => handleEdit(item)}
                          aria-label={`Edit session ${item.name}`}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: "20px", color: "#5870a3" }}>
                      No sessions available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;

