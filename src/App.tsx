import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import MemberPage from './pages/MemberPage.tsx'
import Signup from './pages/SignupPage/Signup.jsx'

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
        
        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App