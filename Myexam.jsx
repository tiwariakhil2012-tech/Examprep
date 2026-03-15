import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const MyExam = () => {
  const [exam, setExam] = useState([]);

  const fetchExams = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exams/exams');
      setExam(res.data);
    } catch (error) {
      console.error("Failed to fetch exams", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="emh-myexam-page">
      <style>{`
      /* Container & Background */
      .emh-myexam-page {
        min-height: 100vh;
        background: linear-gradient(135deg, #b3d9ffcc 0%, #e6f0ff85 50%, #b3d9ffcc 100%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      /* Header */
      .emh-list-header {
        width: 100%;
        max-width: 1200px;
        background: linear-gradient(145deg, #4a90e2, #357abd);
        border-radius: 13px;
        box-shadow: 0 2px 12px #5eaaffb8;
        padding: 18px 0;
        margin-bottom: 25px;
        text-align: center;
      }
      .emh-list-header h3 {
        margin: 0;
        font-size: 1.9rem;
        font-weight: 700;
        color: #d9ecff;
        text-shadow: 0 1.5px 5px #2a5e99aa;
      }

      /* Table Wrapper */
      .emh-table-wrapper {
        width: 100%;
        max-width: 1200px;
        background: linear-gradient(130deg, #4f8edbff 70%, #3b7cd5eb 100%);
        border-radius: 18px;
        padding: 28px 26px;
        box-shadow: inset 5px 5px 100px 20px #66aaff33;
        overflow-x: auto;
      }

      /* Table Styles */
      .emh-table {
        width: 100%;
        color: #cce6ff;
        border-collapse: collapse;
        font-size: 1.15rem;
        min-width: 800px;
        background: transparent;
        font-weight: 500;
      }

      /* Table Head */
      .emh-table th {
        padding: 16px 20px;
        font-weight: 700;
        font-size: 1.22rem;
        text-align: left;
        border-bottom: 3.5px solid #99ccff;
        color: #cceaff;
        letter-spacing: 0.25px;
        background: rgba(24, 85, 155, 0.9);
        user-select: none;
      }

      /* Table Body */
      .emh-table td {
        padding: 16px 20px;
        border-bottom: 1.8px solid rgba(51, 102, 153, 0.65);
        text-align: left;
        color: #b3d1ff;
        letter-spacing: 0.04em;
        transition: background 0.18s ease;
      }

      /* Row hover */
      .emh-table tbody tr:hover {
        background: rgba(70, 130, 230, 0.35);
      }

      /* Start Exam Button */
      .emh-start-exam-btn {
        display: inline-block;
        padding: 10px 22px;
        background: linear-gradient(95deg, #66a3ff 25%, #3399ff 90%);
        color: #f0faff;
        font-weight: 700;
        border-radius: 8px;
        text-decoration: none;
        font-size: 1rem;
        transition: background 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 3px 10px #66a3ff80;
      }
      .emh-start-exam-btn:hover,
      .emh-start-exam-btn:focus {
        background: linear-gradient(95deg, #3366cc 25%, #3399ff 90%);
        outline: none;
        box-shadow: 0 0 14px #3399ffcc;
        color: #e6f2ff;
      }

      /* Empty table message */
      .emh-no-exams {
        padding: 24px 12px;
        color: #3399ff;
        font-weight: 700;
        font-size: 1.15rem;
        text-align: center;
      }

      /* Responsive */
      @media (max-width: 900px) {
        .emh-table {
          font-size: 1rem;
          min-width: unset;
        }
        .emh-table th, .emh-table td {
          padding: 12px 14px;
        }
        .emh-start-exam-btn {
          padding: 8px 18px;
          font-size: 0.95rem;
        }
      }

      @media (max-width: 480px) {
        .emh-myexam-page {
          padding: 20px 10px;
        }
        .emh-list-header h3 {
          font-size: 1.5rem;
        }
      }
      `}</style>

      <header className="emh-list-header">
        <h3>My Exams</h3>
      </header>

      <div className="emh-table-wrapper">
        <table className="emh-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Exam Name</th>
              <th>Date of Exam</th>
              <th>Total Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exam.length === 0 ? (
              <tr>
                <td colSpan="5" className="emh-no-exams">
                  No exams available.
                </td>
              </tr>
            ) : (
              exam.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.title}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.time}</td>
                  <td>
                    <Link to={`/user/getexam/${item._id}`} className="emh-start-exam-btn">
                      Start Exam
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyExam;
