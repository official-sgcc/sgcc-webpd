import { useState } from 'react'
import './LoginPage.css'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");

    return (
    <>
        <main className="screen">
            <section className="login-card">
                <h1 className="login-title">Login</h1>
        
        <div>
            <label className="username-title">username</label>
            <input className="signup-id-input"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
            />
            </div>
        <div>
            <label className="password-title">password</label>
            <input className="signup-password-input"
                type="password"
                autoComplete="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            </div>
        <button className="login-button" type="submit">
            로그인
          </button>
          </section>
        </main>
    </>
    )
}

export default LoginPage;