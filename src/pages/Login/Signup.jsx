import {useState} from "react";


function SignupPage() {
    const[name,setName]=useState('')
    const[studentID,setStudentID]=useState('')
    const[email,setEmail]=useState('')
    const[code,setCode]=useState('')
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

            </form>
        </div>
    );
}


export default SignupPage;