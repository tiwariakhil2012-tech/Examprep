import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ReportPage = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exams/report');
      setData(res.data);
      console.log(res.data);
    } catch (er) {
      alert('Sorry fetching reports');
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlePrint = () => {
    // Implement print logic if needed, e.g. window.print() or customized print
    window.print();
  };

  return (
    <>
      <style>{`
        /* Container & background */
        .report-container {
          min-height: 100vh;
          padding: 30px 15px;
          background: linear-gradient(135deg, #e0f0ff 0%, #b3d8ff 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1a3e72;
        }

        /* Header */
        .report-header {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          color: #254a91;
          text-shadow: 0 1px 4px rgba(37, 74, 145, 0.3);
        }
        .report-header i {
          font-size: 2.6rem;
          margin-right: 0.6rem;
          color: #4a78d1;
          text-shadow: 0 0 10px #5679d4a0;
        }

        /* Table wrapper */
        .table-responsive {
          border-radius: 15px;
          overflow: auto;
          box-shadow: 0 8px 30px rgba(66, 133, 244, 0.25);
          background: #f6fbffcc;
          border: 1.5px solid #9bc1ff88;
          padding: 15px;
        }

        /* Table itself */
        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px; /* space between rows */
          min-width: 900px;
          font-size: 1.05rem;
          color: #234373;
          background: transparent;
        }

        thead tr th {
          font-weight: 700;
          font-size: 1.1rem;
          padding: 14px 12px;
          text-align: center;
          color: #3e6db7;
          background: #c9ddff;
          border-radius: 10px 10px 0 0;
          user-select: none;
          box-shadow: inset 0 -3px 5px #92b2ff50;
        }

        tbody tr {
          background: #d9e7ffdd;
          border-radius: 14px;
          box-shadow: 0 4px 16px #a4c1ff33;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        tbody tr:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px #7ba1ff77;
          background: #c3d6ffee;
        }

        tbody tr td {
          padding: 14px 10px;
          text-align: center;
          vertical-align: middle;
          color: #234373;
          font-weight: 600;
          user-select: text;
        }

        /* Rounded corners on first + last td to keep row pill shape */
        tbody tr td:first-child {
          border-radius: 14px 0 0 14px;
        }
        tbody tr td:last-child {
          border-radius: 0 14px 14px 0;
        }

        /* Button */
        .btn-print {
          padding: 8px 22px;
          background: linear-gradient(145deg, #6495ed 30%, #4169e1 95%);
          color: white;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 5px 15px #3f6adba8;
          transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease;
          user-select: none;
        }
        .btn-print:hover,
        .btn-print:focus {
          background: linear-gradient(145deg, #4169e1 30%, #2f51b5 95%);
          box-shadow: 0 8px 25px #28488fa8;
          outline: none;
          transform: scale(1.05);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          table {
            min-width: 700px;
          }
        }
        @media (max-width: 700px) {
          .report-container {
            padding: 20px 10px;
          }
          table {
            min-width: unset;
            font-size: 0.95rem;
          }
          thead tr th, tbody tr td {
            padding: 10px 6px;
          }
          .btn-print {
            padding: 6px 16px;
            font-size: 0.9rem;
          }
          .report-header {
            font-size: 1.8rem;
          }
          .report-header i {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="report-container container-fluid">
        <h1 className="report-header">
          <i className="bi bi-file-earmark-text-fill"></i>
          Report Generation
        </h1>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Exam Name</th>
                <th>Examinee</th>
                <th>Examinee Email</th>
                <th>Total Marks</th>
                <th>Passing Marks</th>
                <th>Score</th>
                <th>Status</th>
                <th>DOE</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.examTitle}</td>
                  <td>{item.examineeName}</td>
                  <td>{item.examineeEmail}</td>
                  <td>{item.totalMarks}</td>
                  <td>{item.passingMarks}</td>
                  <td>{item.score}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.attemptedAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-print" onClick={() => window.print()}>
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
