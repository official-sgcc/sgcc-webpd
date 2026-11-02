import { useState } from 'react'

function LoginPage() {
    const [username, setUsername] = useState('');

    return (
    <>
        <input className="signup-id-input"
            type="text"
            autoComplete="username"
            placeholder="아이디"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
    </>
    )
}

export default LoginPage;