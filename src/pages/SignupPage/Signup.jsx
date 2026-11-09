import {useState} from "react";


function SignupPage() {
    const[name,setName]=useState('')
    const[studentID,setStudentID]=useState('')
    const[email,setEmail]=useState('')
    const[code,setCode]=useState('')
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[pwConfirm,setPwConfirm]=useState('')

    return(
        <div>
            <form>
              <input
                type="text"
                placeholder="성명"
                value={name}
                onChange={(e) => setName(e.target.value)}
               />
              <input
                type="text"
                placeholder="학번"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                />
              <input
               type="text"
               placeholder="서강대학교 이메일"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
              <button type="button">전송</button>
              <input
               type="text"
               placeholder="인증코드"
               value={code}
               onChange={(e) => setCode(e.target.value)}
               />
               <button type="button">확인</button>
              <input
               type="text"
               placeholder="아이디"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               />
               <input
                type="text"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <input
                type="password"
                placeholder="비밀번호 확인"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                />

            </form>
        </div>
    );
}


export default SignupPage;