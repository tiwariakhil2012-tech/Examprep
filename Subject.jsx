import React, { useState, useEffect } from "react";
import axios from "axios";

const Subject = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [data, setData] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState("");

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler for add or edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editForm) {
        const res = await axios.put(`http://localhost:5000/api/subject/${id}`, form);
        if (res) {
          alert("Subject edited successfully");
          resetForm();
          fetchSubjects();
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/subject", form);
        if (res) {
          alert("Subject added successfully");
          resetForm();
          fetchSubjects();
        }
      }
    } catch (err) {
      alert("Error: Please try again later.");
    }
  };

  // Reset form inputs and state
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });
    setEditForm(false);
    setId("");
  };

  // Fetch subjects from backend
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subject");
      setData(res.data.data || []);
    } catch (err) {
      alert("Error fetching subjects. Please try again later.");
      setData([]);
    }
  };

  // Delete subject by id
  const handleDelete = async (idToDelete) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/subject/${idToDelete}`);
      alert("Subject deleted successfully");
      fetchSubjects();
    } catch (err) {
      alert("Failed to delete. Please try again later.");
    }
  };

  // Prepare form to edit an existing subject
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
    });
    setEditForm(true);
    setId(item._id);
  };

  // Fetch subjects after component mounts
  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="subject-container">
      <style>{`
        .subject-container {
          background: linear-gradient(120deg, #e0f7fa, #f6faff);
          min-height: 100vh;
          padding: 2rem 1rem;
          font-family: 'Poppins', sans-serif;
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
          transition: box-shadow 0.3s ease;
          padding: 30px;
          margin-bottom: 2rem;
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
          width: 100%;
          resize: vertical;
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
          border-radius: 20px;
          box-shadow: 0 6px 15px rgba(54 121 243 / 0.6);
          padding: 13px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          width: 100%;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }
        .glass-btn:hover {
          background: linear-gradient(135deg, #3a6df8 0%, #2e65f7 100%);
          box-shadow: 0 9px 24px rgba(37 88 255 / 0.85);
          transform: scale(1.05);
        }
        .table-wrapper {
          background-color: rgba(255 255 255 / 0.85);
          border-radius: 20px;
          box-shadow:
            0 12px 48px rgba(159 180 255 / 0.3);
          padding: 1rem;
          overflow-x: auto;
          user-select: text;
          max-width: 900px;
          margin: 0 auto;
        }
        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 1rem;
          font-weight: 500;
          font-size: 1rem;
          color: #26427b;
          text-align: center;
        }
        thead tr {
          background: linear-gradient(90deg, #a0b3ff 15%, #7796ff 90%);
          color: white;
          font-weight: 600;
          border-radius: 16px;
          user-select: none;
        }
        thead tr th {
          padding: 12px;
          border-radius: 16px 16px 0 0;
        }
        tbody tr {
          background: #edf4ff;
          box-shadow: 0 5px 15px rgb(101 128 244 / 0.4);
          border-radius: 16px;
          transition: all 0.25s ease;
        }
        tbody tr:hover {
          background: #dbe7fe;
          box-shadow: 0 8px 24px rgb(76 104 234 / 0.6);
          cursor: pointer;
        }
        tbody tr td {
          padding: 14px 10px;
          vertical-align: middle;
        }
        button {
          border-radius: 16px;
          font-weight: 600;
          padding: 8px 14px;
          min-width: 90px;
          user-select: none;
          transition: background 0.3s ease;
          margin: 0 4px;
        }
        .btn-info {
          background: linear-gradient(135deg, #799eff 0%, #406bfc 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(59 91 251 / 0.7);
        }
        .btn-info:hover {
          background: linear-gradient(135deg, #5b7be9 0%, #274ddf 100%);
          box-shadow: 0 8px 26px rgba(36 61 229 / 0.8);
        }
        .btn-danger {
          background: linear-gradient(135deg, #f36e6e 0%, #e84e4e 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(243 110 110 / 0.7);
        }
        .btn-danger:hover {
          background: linear-gradient(135deg, #e04848 0%, #c92222 100%);
          box-shadow: 0 8px 26px rgba(224 34 34 / 0.85);
        }
        @media (max-width: 768px) {
          .subject-container {
            padding: 1.5rem 1rem;
          }
          .glass-card {
            padding: 20px 16px;
          }
          table {
            font-size: 0.9rem;
          }
          thead tr th {
            font-size: 0.9rem;
            padding: 10px;
          }
          tbody tr td {
            padding: 10px 6px;
          }
          button {
            min-width: 75px;
            padding: 6px 10px;
            font-size: 0.85rem;
            margin: 2px 2px;
          }
        }
      `}</style>

      <h1 className="text-center" style={{ color: "#25407a", marginBottom: "2rem" }}>
        <i className="fa-solid fa-book me-2"></i> Manage Subjects
      </h1>

      <div className="container">
        <div className="glass-card mb-5" role="form" aria-label="Add or Edit Subject Form">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Subject Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter subject name"
                value={form.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="subjectNameHelp"
              />
              <small id="subjectNameHelp" className="form-text text-muted" style={{ userSelect: "none" }}>
                Please enter the name of the subject.
              </small>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Subject Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                placeholder="Enter subject description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                aria-describedby="subjectDescriptionHelp"
              />
              <small id="subjectDescriptionHelp" className="form-text text-muted" style={{ userSelect: "none" }}>
                Optional: add details about the subject.
              </small>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="glass-btn"
                aria-label={editForm ? "Update Subject" : "Add Subject"}
              >
                {editForm ? (
                  <>
                    <i className="fa-solid fa-pen-to-square me-2"></i> Update Subject
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-plus me-2"></i> Add Subject
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="table-wrapper" aria-label="Subject List">
          <h4
            className="text-center"
            style={{ color: "#5a6f9a", marginBottom: "1rem", userSelect: "none" }}
          >
            <i className="fa-solid fa-list-books me-2"></i> Subject List
          </h4>
          <div className="table-responsive">
            <table role="table" aria-label="Subjects table">
              <thead role="rowgroup">
                <tr role="row">
                  <th role="columnheader" scope="col">#</th>
                  <th role="columnheader" scope="col">Subject Name</th>
                  <th role="columnheader" scope="col">Description</th>
                  <th role="columnheader" scope="col">Created At</th>
                  <th role="columnheader" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {data.length > 0 ? (
                  data.map((item, i) => (
                    <tr role="row" key={item._id}>
                      <td role="cell">{i + 1}</td>
                      <td role="cell">{item.name}</td>
                      <td role="cell">{item.description}</td>
                      <td role="cell">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td role="cell">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(item._id)}
                          aria-label={`Delete subject ${item.name}`}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => handleEdit(item)}
                          aria-label={`Edit subject ${item.name}`}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td role="cell" colSpan={5} style={{ padding: "20px", color: "#5870a3" }}>
                      No subjects available.
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

export default Subject;
