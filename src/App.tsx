import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import MemberPage from './pages/MemberPage.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MemberPage />
  )
}

export default App
