import {useState} from "react";


function SignupPage() {
    const[name,setName]=useState('')
    const[studentID,setStudentID]=useState('')
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
            </form>
        </div>
    );
}


export default SignupPage;