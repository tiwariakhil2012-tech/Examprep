import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const tableStyles = {
  tableContainerOuter: {
    margin: "22px auto 0 auto",
    background: "linear-gradient(130deg, #a3c6ffdd 65%, #e5f0ffdd 100%)",
    borderRadius: "18px",
    padding: "26px 24px",
    boxShadow: "inset 5px 5px 100px 20px #b9d9ff88",
    overflowX: "auto",
    maxWidth: "900px", // reduced width - fits dashboard better
    width: "100%",
  },
  table: {
    width: "100%",
    color: "#204a87",
    borderCollapse: "collapse",
    fontSize: "1.05rem",
    minWidth: "650px", // allow horizontal scroll on smaller screens
    borderRadius: "8px 8px 0 0"
  },
  th: {
    padding: "14px",
    fontWeight: "600",
    fontSize: "1.1rem",
    textAlign: "left",
    borderBottom: "2.5px solid #94b9ff",
    color: "#1a3e72",
    letterSpacing: ".1px"
  },
  td: {
    padding: "13px 10px",
    borderBottom: "1.5px solid #c4d7f7",
    textAlign: "left",
    background: "rgba(255,255,255,0.15)",
    fontSize: "1.07rem",
    color: "#346baa"
  },
};

const Message = () => {
  const [formData, setFormData] = useState({
    question: '',
    email: localStorage.getItem('userEmail') || ''
  });
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/message', formData);
      alert(response.data.message);
      setFormData({ question: '', email: formData.email }); // Keep email
      fetchMessages(); // Refresh messages
    } catch (error) {
      alert('Failed to send message');
    }
  };

  const fetchMessages = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/message/${userId}`);
      setMessages(response.data.message);
    } catch (error) {
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        background: 'linear-gradient(135deg, #c7dfff, #e8f0ff, #c7dfff)',
        position: 'relative',
        padding: '20px', // gives some breathing room inside dashboard content area
        width: '100%',
        minHeight: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Glass Blur Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(222,231,255,0.5)',
          zIndex: 0,
        }}
      />
      {/* Main Content Wrapper */}
      <div 
        className="position-relative z-1" 
        style={{ maxWidth: '650px', width: '100%', marginTop: "40px", marginBottom: "40px", padding: '0 10px' }}
      >
        {/* Contact Form Card */}
        <div
          className="p-4 rounded-4 shadow-lg"
          style={{
            background: 'rgba(240, 248, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(150, 180, 255, 0.7)',
            color: '#1c3d7a',
          }}
        >
          <h2 className="text-center mb-4" style={{ color: '#1a3e72' }}>
            <i className="bi bi-envelope-fill me-2"></i> Contact Us
          </h2>
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold" style={{ color: '#2e4c81' }}>
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="question"
                rows="6"
                placeholder="Write your message here..."
                value={formData.question}
                onChange={handleChange}
                required
                style={{
                  background: 'rgba(230, 240, 255, 0.8)',
                  border: 'none',
                  color: '#1c3d7a',
                  backdropFilter: 'blur(15px)',
                  resize: 'vertical',
                  borderRadius: '10px',
                  boxShadow: 'inset 0 0 8px #a9c3ffcc',
                }}
              />
            </div>
            <button
              type="submit"
              className="btn fw-bold w-100"
              style={{
                background: 'linear-gradient(180deg, #a9c3ff, #6c8ced)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                transition: 'transform 0.2s',
                letterSpacing: "1.5px",
                color: 'white',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      {/* Messages Table Card */}
      <div 
        className="position-relative z-1" 
        style={{ maxWidth: "900px", width: '100%', marginBottom: '40px', padding: '0 10px' }}
      >
        <div style={tableStyles.tableContainerOuter}>
          <h3 style={{ color: "#4a7fa6", marginBottom: 18, fontWeight: "bold" }}>
            <i className="bi bi-chat-dots me-2"></i> Your Messages
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyles.table}>
              <thead>
                <tr>
                  <th style={tableStyles.th}>SN</th>
                  <th style={tableStyles.th}>Question</th>
                  <th style={tableStyles.th}>Date</th>
                  <th style={tableStyles.th}>Reply</th>
                </tr>
              </thead>
              <tbody>
                {
                  messages.length > 0 ? messages.map((message, index) => (
                    <tr key={message._id}>
                      <td style={tableStyles.td}>{index + 1}</td>
                      <td style={tableStyles.td}>{message.question}</td>
                      <td style={tableStyles.td}>{new Date(message.createdAt).toLocaleDateString()}</td>
                      <td style={tableStyles.td}>{message.reply || 'No reply yet'}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td style={tableStyles.td} colSpan={4} align="center" >
                        No messages to display.
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
