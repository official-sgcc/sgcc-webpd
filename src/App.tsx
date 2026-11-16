import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import MemberPage from './pages/MemberPage.tsx'
import SignupPage from './pages/SignupPage/Signup.jsx'
import ProjectPage from './pages/ProjectPage/ProjectPage.jsx'
import MemberInfoPage from './pages/MemberInfoChange.tsx'
import FindpasswordPage from './pages/Findpassword.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 접속 경로: 사용자 페이지 */}
        <Route path="/" element={<MemberPage />} />

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminPage />} />

        {/* 프로젝트 페이지 */}
        <Route path="/project" element={<ProjectPage />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 비밀번호 찾기 페이지 */}
        <Route path="/findpassword" element={<FindpasswordPage />} />

        {/*회원가입 페이지*/}
        <Route path='/signup' element={<SignupPage />} />
        
        {/*회원정보 수정 페이지*/}
        <Route path='/infochange' element={<MemberInfoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
