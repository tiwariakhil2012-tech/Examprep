import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Examinee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    qualification: '',
    address: '',
    number: '',
    password: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/examinee');
      setData(res.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/examinee/${editId}`, formData);
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/examinee', formData);
      }

      setFormData({
        name: '',
        email: '',
        number: '',
        college: '',
        qualification: '',
        address: '',
        password: ''
      });

      handleFetch();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/examinee/${id}`);
    if (res) {
      alert('Deleted successfully');
      handleFetch();
    } else {
      alert('Try again later');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      email: item.email,
      number: item.number,
      college: item.college,
      qualification: item.qualification,
      address: item.address,
      password: item.password
    });
    setEditMode(true);
    setEditId(item._id);
  };

  return (
    <div style={styles.page}>
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
          background: #e7f0ff;
          color: #1a2e65;
          user-select: none;
        }
        input, button {
          font-family: inherit;
        }
        input::placeholder {
          color: #a0b3d6;
          opacity: 1;
        }
        input:-ms-input-placeholder {
          color: #a0b3d6;
        }
        input::-ms-input-placeholder {
          color: #a0b3d6;
        }
        button {
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        button:hover {
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(54,121,243,0.5);
        }
        table {
          border-spacing: 0 12px !important;
          border-collapse: separate !important;
        }
        table thead th {
          user-select: none;
        }
      `}</style>

      <div style={styles.card}>
        <h2 style={styles.heading}>Student Registration</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="email"
          />
          <input
            type="text"
            name="college"
            placeholder="College"
            value={formData.college}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="new-password"
          />
          <input
            type="text"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="tel"
          />
          <button type="submit" style={styles.button}>
            {editMode ? 'Update' : 'Register'}
          </button>
        </form>

        <table style={styles.table} aria-label="Examinee List">
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>College</th>
              <th style={styles.th}>Qualification</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Password</th>
              <th style={styles.th}>Number</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item._id} style={styles.tableRow}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.email}</td>
                <td style={styles.td}>{item.college}</td>
                <td style={styles.td}>{item.qualification}</td>
                <td style={styles.td}>{item.address}</td>
                <td style={styles.td}>{item.password}</td>
                <td style={styles.td}>{item.number}</td>
                <td style={{ ...styles.td, display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ ...styles.actionButton, ...styles.deleteBtn }}
                    aria-label={`Delete ${item.name}`}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{ ...styles.actionButton, ...styles.editBtn }}
                    aria-label={`Edit ${item.name}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #e6f0ff, #f6faff)',
    padding: '40px 20px',
    fontFamily: "'Poppins', sans-serif",
    color: '#1a2e65'
  },
  card: {
    width: '100%',
    maxWidth: '1100px',
    backgroundColor: 'rgba(255 255 255 / 0.9)',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(90 117 170 / 0.15)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#1f2937',
    userSelect: 'none',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '18px',
    marginBottom: '36px',
    justifyContent: 'space-between',
  },
  input: {
    flex: '1 1 30%',
    padding: '12px',
    borderRadius: '15px',
    border: '1.8px solid #a3bee9',
    fontSize: '1rem',
    backgroundColor: 'rgba(255 255 255 / 0.7)',
    boxShadow:
      'inset 1.5px 1.5px 6px rgba(255 255 255 / 0.85), inset -1.5px -1.5px 6px rgba(160 190 250 / 0.9)',
    color: '#1a2e65',
    outline: 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  },
  button: {
    flex: '1 1 100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #6294f7 0%, #3679f8 90%)',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '1.2rem',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(54 121 243 / 0.6)',
    userSelect: 'none',
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 12px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#26427b',
    userSelect: 'text',
  },
  th: {
    backgroundColor: '#638cec',
    color: '#fff',
    padding: '12px',
    borderRadius: '12px 12px 0 0',
  },
  td: {
    backgroundColor: 'rgba(245, 248, 253, 0.8)',
    padding: '14px 12px',
    borderRadius: '12px',
    boxShadow: 'inset 1px 1px 6px rgba(180, 200, 255, 0.4)',
    color: '#1a2e65',
    fontSize: '0.95rem',
  },
  tableRow: {
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  actionButton: {
    fontWeight: '600',
    padding: '8px 16px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  deleteBtn: {
    backgroundColor: '#f24e4e',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(242, 78, 78, 0.7)',
    transition: 'background-color 0.25s ease',
  },
  editBtn: {
    backgroundColor: '#3679f8',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(54, 121, 243, 0.7)',
    transition: 'background-color 0.25s ease',
  },
};

export default Examinee;
