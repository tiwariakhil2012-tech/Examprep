import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashbord from './pages/admin/Dashbord';
import Registration from './pages/Registration';
import Session from './pages/admin/Session';
import Subject from './pages/admin/Subject';
import Examinee from './pages/admin/Examinee';
import AdminLogin from './pages/admin/AdminLogin';
import Dashborduser from './pages/user/Dashborduser';
import QuestionBank from './pages/admin/QuestionBank';
import ExaminationForm from './pages/admin/Examination';
import MyExam from './pages/user/Myexam';
import GetExam from './pages/user/GetExam';
import ChangePassword from './pages/user/ChangePassword';
import Profile from './pages/user/Profile';
import ResultDeclaration from './pages/admin/Report';
import Message from './pages/user/Message';
import Msg from './pages/admin/Msg';
import ExamResultsDeclaration from './pages/admin/ExamResultsDeclaration';
import Result from './pages/user/Result';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path='/adlogin' element={<AdminLogin />}></Route>
          <Route path="/admin/" element={<Dashbord />} >
            <Route path='result' element={<ExamResultsDeclaration />}></Route>
            <Route path="session" element={<Session />}></Route>
            <Route path="questions" element={<QuestionBank />}></Route>
            <Route path="message" element={<Msg />}></Route>
            <Route path="exams" element={<ExaminationForm />}></Route>
            <Route path="subject" element={<Subject />}></Route>
            <Route path="examinee" element={<Examinee />}></Route>
            <Route path="resultdeclaration" element={<ResultDeclaration />}></Route>
            <Route path="resultdeclaration" element={<ResultDeclaration />}></Route>
            <Route path="result" element={<ExamResultsDeclaration />}></Route>
          </Route>
          <Route path="/user" element={<Dashborduser />}>
            <Route path="myexam" element={<MyExam />}></Route>
            <Route path="getexam/:id" element={<GetExam />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="ChangePassword" element={<ChangePassword />}></Route>
            <Route path="message" element={<Message />}></Route>
            <Route path="myresult" element={<Result />}></Route>
          </Route>
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  )
}

export default App
