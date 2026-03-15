import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [formData, setFormData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    subject: '',
  });

  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    fetchQuestions();
    fetchSubjects();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/question');
      setQuestions(res.data.data || []);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/subject');
      setSubjects(res.data.data || []);
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setSubjects([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editForm) {
        if (!id) {
          alert("Please select a question to edit.");
          return;
        }
        await axios.put(`http://localhost:5000/api/question/${id}`, formData);
        setEditForm(false);
        setId('');
      } else {
        await axios.post('http://localhost:5000/api/question', formData);
      }
      await fetchQuestions();
      setFormData({
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        subject: '',
      });
    } catch (err) {
      console.error('Error submitting question:', err);
      alert('Sorry, try again.');
    }
  };

  const handleDelete = async (idDel) => {
    try {
      await axios.delete(`http://localhost:5000/api/question/${idDel}`);
      alert('Deleted successfully');
      await fetchQuestions();
    } catch (err) {
      alert('Try again later.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      questionText: item.questionText || '',
      optionA: item.optionA || '',
      optionB: item.optionB || '',
      optionC: item.optionC || '',
      optionD: item.optionD || '',
      correctAnswer: item.correctAnswer || '',
      subject: item.subject || '',
    });
    setEditForm(true);
    setId(item._id);
  };

  return (
    <div className="container my-5">
      <style>{`
        .container {
          max-width: 900px;
          background: linear-gradient(135deg, #eaf4ff, #f7fbff);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          box-shadow:
            0 12px 36px rgba(68, 104, 226, 0.1),
            inset 0 0 40px #a9c6ff8c;
          font-family: "Poppins", sans-serif;
          color: #1a2e65;
          user-select: none;
        }

        h1.text-center {
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 1.8rem;
          color: #25407a;
          user-select: none;
        }

        .card {
          background: rgba(255 255 255 / 0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 18px;
          border: 1.5px solid rgba(255 255 255 / 0.3);
          box-shadow:
            0 8px 30px rgba(0 0 0 / 0.08),
            inset 4px 4px 10px rgba(255 255 255 / 0.5),
            inset -4px -4px 10px rgba(182 211 251 / 0.5);
          padding: 2rem;
          margin-bottom: 2rem;
          transition: box-shadow 0.3s ease;
        }
        .card:hover {
          box-shadow:
            0 12px 40px rgba(0,0,0,0.12),
            inset 5px 5px 12px rgba(255,255,255,0.6),
            inset -5px -5px 12px rgba(170, 200, 255, 0.7);
        }

        .form-label {
          font-weight: 600;
          color: #2c3e8f;
          margin-bottom: 0.5rem;
          user-select: text;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        input.form-control,
        select.form-select {
          background-color: rgba(255 255 255 / 0.9);
          border: 2px solid #8ba9ff;
          border-radius: 15px;
          padding: 0.6rem 1rem;
          font-size: 1rem;
          color: #244476;
          box-shadow:
            inset 2px 2px 8px rgba(255 255 255 / 0.9),
            inset -2px -2px 8px rgba(136 158 234 / 0.9);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          outline: none;
        }
        input.form-control::placeholder,
        select.form-select option:first-child {
          color: #a1b3df;
        }
        input.form-control:focus,
        select.form-select:focus {
          background-color: #f6fbff;
          border-color: #3a63ce;
          box-shadow:
            0 0 10px 3px #5790ff,
            inset 2px 2px 10px rgba(116 140 255 / 0.8);
          color: #1a337e;
        }

        button.btn-primary {
          background: linear-gradient(135deg, #618bff 0%, #3a6cf3 100%);
          color: white;
          border: none;
          border-radius: 25px;
          padding: 12px 0;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow:
            0 10px 30px rgba(64 109 225 / 0.7);
          transition: background 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
        }

        button.btn-primary:hover {
          background: linear-gradient(135deg, #5078e6 0%, #2f55d3 100%);
          box-shadow:
            0 15px 45px rgba(46 75 200 / 0.9);
          transform: scale(1.06);
        }

        .table-responsive {
          overflow-x: auto;
          user-select: text;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 14px;
          color: #2e4386;
          font-weight: 600;
          font-size: 1rem;
          text-align: center;
        }

        thead tr {
          background: linear-gradient(90deg, #778efb 15%, #406ae2 90%);
          color: white;
          font-weight: 700;
          border-radius: 20px;
          user-select: none;
        }

        thead tr th {
          padding: 1.1rem 1rem;
          border-radius: 20px 20px 0 0;
        }

        tbody tr {
          background: #e3ecff;
          box-shadow:
            0 8px 25px rgba(73 103 208 / 0.18);
          border-radius: 15px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        tbody tr:hover {
          background: #d0deff;
          box-shadow:
            0 15px 40px rgba(46 74 196 / 0.25);
          cursor: pointer;
        }

        tbody tr td {
          padding: 16px 12px;
          user-select: text;
        }

        button.btn-danger, button.btn-primary {
          border-radius: 20px;
          font-weight: 600;
          padding: 8px 14px;
          min-width: 80px;
          user-select: none;
          transition: background-color 0.3s, box-shadow 0.3s;
        }

        button.btn-danger {
          background: linear-gradient(135deg, #f96a6a 0%, #de455e 100%);
          color: white;
          border: none;
          box-shadow: 0 7px 22px rgba(229 74 74 / 0.75);
        }

        button.btn-danger:hover {
          background: linear-gradient(135deg, #de455e 0%, #bf2243 100%);
          box-shadow: 0 10px 30px rgba(182 34 53 / 0.9);
        }

        button.btn-primary {
          background: linear-gradient(135deg, #5f89ff 0%, #3f68f5 100%);
          box-shadow: 0 7px 22px rgba(52 92 244 / 0.7);
        }

        button.btn-primary:hover {
          background: linear-gradient(135deg, #3f68f5 0%, #234fda 100%);
          box-shadow: 0 10px 30px rgba(35 74 214 / 0.8);
        }

        @media (max-width: 768px) {
          .container {
            padding: 2rem 1rem;
          }
          h1.text-center {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
          }
          input.form-control,
          select.form-select {
            font-size: 0.9rem;
            padding: 0.5rem 0.8rem;
          }
          button.btn-primary,
          button.btn-danger {
            font-size: 0.9rem;
            padding: 6px 12px;
            min-width: 65px;
          }
          table {
            font-size: 0.9rem;
          }
          tbody tr td, thead tr th {
            padding: 10px 6px;
          }
        }
      `}</style>

      <h1 className="text-center mb-4">Question Bank</h1>

      {/* Question Form */}
      <div className="card p-4 mb-4 shadow">
        <h4 className="mb-3">{editForm ? 'Edit Question' : 'Add a New Question'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="questionText" className="form-label">Question</label>
            <input
              type="text"
              className="form-control"
              name="questionText"
              value={formData.questionText}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            {['A', 'B', 'C', 'D'].map((opt) => (
              <div className="col-md-6 mb-3" key={opt}>
                <label htmlFor={`option${opt}`} className="form-label">{`Option ${opt}`}</label>
                <input
                  type="text"
                  className="form-control"
                  name={`option${opt}`}
                  value={formData[`option${opt}`]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label htmlFor="correctAnswer" className="form-label">Correct Answer</label>
            <input
              type="text"
              className="form-control"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              required
            />
            <small className="form-text text-muted">Please type the full text of the correct option.</small>
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select subject</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              {editForm ? 'Update Question' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>

      {/* Question Table */}
      <div className="card p-4 shadow">
        <h4 className="mb-3">Question Bank</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                  <th>Subject</th>

                <th>Question</th>
                <th>Option A</th>
                <th>Option B</th>
                <th>Option C</th>
                <th>Option D</th>
                <th>Correct Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? (
                questions.map((q, index) => (
                  <tr key={q._id}>
                    <td>{ index+1}</td>
                    <td>{q.subject?.name}</td>
                    <td>{q.questionText}</td>
                    <td>{q.optionA}</td>
                    <td>{q.optionB}</td>
                    <td>{q.optionC}</td>
                    <td>{q.optionD}</td>
                    <td>{q.correctAnswer}</td>
                    <td>
                      <button onClick={() => handleDelete(q._id)} className="rounded bg-danger text-white px-2 me-2">Delete</button>
                      <button onClick={() => handleEdit(q)} className="rounded bg-primary text-white px-2">Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">No questions added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
