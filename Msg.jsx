import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Message = () => {
    const [formData , setFormData] = useState({
        question: '',
        email: localStorage.getItem('userEmail') || ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/message', formData);

            alert(response.data.message);
            setFormData({ question: '', email: formData.email });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        }
    };

    const [messages, setMessages] = useState([]);
    const fetchMessages = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:5000/api/message/${userId}`);
            setMessages(response.data.message);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-8 mx-auto">
                <form method='post' onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-12 mx-auto">
                            <textarea className='form-control' name="question" onChange={handleChange} id="" placeholder='Ask Question Here'></textarea>
                            <input type="Submit" value="Send" className='btn btn-primary' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="row-my-5">
            <div className="col-sm-8 mt-5 mx-auto">
                <div className="table-responsive">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Question</th>
                                <th>Date</th>
                                <th>Reply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message, index) => (
                                <tr key={message._id}>  
                                    <td>{index + 1}</td>
                                    <td>{message.question}</td>
                                    <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                                    <td>{message.reply || 'No reply yet'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Message