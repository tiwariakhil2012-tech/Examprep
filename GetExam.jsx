import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const Getexam = () => {
    const { id: examId } = useParams();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const email = localStorage.getItem('userEmail');
    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/exams/exam/${examId}`);
                const { exam: examData, questions: questionData } = res.data;
                setExam(examData);
                setQuestions(questionData);
                setTimeLeft(parseInt(examData.duration, 10) * 60);
            } catch (err) {
                console.error('Error fetching exam:', err);
                setError(err.response?.data?.error || 'Failed to load exam');
            }
        };
        fetchExam();
    }, [examId]);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || submitted) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, submitted]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerChange = (questionId, answer) => {
        if (submitted) return; // prevent post-submit edits
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = async () => {
        if (submitted) return; // Prevent multiple submissions

        try {
            const res = await axios.post('http://localhost:5000/api/exams/submit-exam', {
                examId,
                answers,
                email,
            });
            setResult(res.data);
            setSubmitted(true);
            alert("Your Exam was submitted successfully. Result will be declared soon.");
            window.location.href = '/user/profile';
        } catch (err) {
            console.error('Error submitting exam:', err);
            setError(err.response?.data?.error || 'Failed to submit exam');
        }
    };


    if (error) {
        return <div style={styles.alert}>{error}</div>;
    }

    if (!exam || !questions.length) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{exam.title}</h2>
            {(
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={styles.form}>
                    {questions.map((q, index) => (
                        <div key={q._id} style={styles.card}>
                            <h5 style={styles.questionTitle}>Question {index + 1}: {q.questionText}</h5>
                            {['A', 'B', 'C', 'D'].map((opt) => {
                                const optionText = q[`option${opt}`];
                                const optionId = `option${opt}-${q._id}`;
                                return (
                                    <label htmlFor={optionId} key={opt} style={styles.radioWrapper}>
                                        <input
                                            type="radio"
                                            name={`question-${q._id}`}
                                            value={optionText}
                                            checked={answers[q._id] === optionText}
                                            onChange={() => handleAnswerChange(q._id, optionText)}
                                            id={optionId}
                                            disabled={submitted}
                                            style={styles.radioInput}
                                        />
                                        <span style={styles.radioLabel}>{optionText}</span>
                                    </label>
                                );
                            })}
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={submitted}
                        style={{ ...styles.submitButton, ...(submitted ? styles.submitButtonDisabled : {}) }}
                    >
                        Submit Exam
                    </button>
                </form>
            )}
        </div>
    );
};


const styles = {
    container: {
        maxWidth: 900,
        margin: 'auto',
        padding: 24,
        background: 'rgba(245, 248, 253, 0.9)',
        borderRadius: 28,
        boxShadow: '0 12px 40px rgba(0, 123, 255, 0.15)',
        fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#204060',
    },
    title: {
        textAlign: 'center',
        color: '#186fa0',
        marginBottom: 24,
        fontSize: '2.4rem',
        fontWeight: 700,
    },
    examInfo: {
        display: 'flex',
        gap: 40,
        justifyContent: 'center',
        marginBottom: 24,
        flexWrap: 'wrap',
        fontSize: '1.1rem',
        fontWeight: 600,
    },
    timer: {
        fontWeight: 'bold',
        color: '#1273e6',
    },
    card: {
        background: 'white',
        padding: 22,
        marginBottom: 20,
        borderRadius: 20,
        boxShadow:
            '0 8px 24px rgba(72, 132, 255, 0.12), inset 3px 3px 6px #d0dbf8',
    },
    questionTitle: {
        marginBottom: 18,
        fontSize: '1.15rem',
        color: '#1a3d6e',
    },
    radioWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 14,
        cursor: 'pointer',
    },
    radioInput: {
        width: 18,
        height: 18,
        marginRight: 12,
        cursor: 'pointer',
    },
    radioLabel: {
        fontSize: '1.05rem',
        color: '#2e4c78',
        userSelect: 'none',
    },
    submitButton: {
        width: '100%',
        padding: '14px',
        borderRadius: 28,
        border: 'none',
        background: 'linear-gradient(135deg, #4a89ff, #3bc6c4)',
        color: '#fff',
        fontSize: '1.2rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    submitButtonDisabled: {
        background: 'gray',
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none',
    },
    alert: {
        margin: 16,
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#fdecea',
        color: '#d32f2f',
        fontWeight: '600',
        textAlign: 'center',
    },
    loading: {
        margin: 16,
        fontSize: '1.25rem',
        textAlign: 'center',
        color: '#4a90e2',
    },
    resultBox: {
        background: 'white',
        borderRadius: 24,
        padding: 30,
        boxShadow: '0 12px 48px rgba(40, 140, 255, 0.25)',
        color: '#1c3a70',
    },
    statusPass: {
        color: 'limegreen',
        fontWeight: '700',
    },
    statusFail: {
        color: '#ff4c4c',
        fontWeight: '700',
    },
    answerList: {
        marginTop: 16,
        lineHeight: 1.6,
    },
    answerItem: {
        marginBottom: 14,
        paddingBottom: 10,
        borderBottom: '1px solid #ddd',
    }
};

export default Getexam;
