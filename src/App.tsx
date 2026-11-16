import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import MemberPage from './pages/MemberPage.tsx'
<<<<<<< HEAD
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";

=======
import SignupPage from './pages/SignupPage/Signup'
>>>>>>> 038e73b80b21a0ba2d7bd73453038ce4b71191d0

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 접속 경로: 사용자 페이지 */}
        <Route path="/" element={<MemberPage />} />

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminPage />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

<<<<<<< HEAD
        <Route path="/project" element={<ProjectPage />} />
=======
        {/*회원가입 페이지*/}
        <Route path='/signup' element={<SignupPage />} />
>>>>>>> 038e73b80b21a0ba2d7bd73453038ce4b71191d0
      </Routes>
    </BrowserRouter>
  )
}

export default App