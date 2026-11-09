import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AdminPage />
  )
}

export default App
