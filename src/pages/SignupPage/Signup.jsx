import { useState } from "react";
import "./Signup.css";

// ===== 입력값 검사 규칙 (팀에서 정한 규칙이 있으면 바꾸기) =====
const STUDENT_ID_RULE = /^\d{8}$/; // 숫자 8자리
const EMAIL_RULE = /^[^\s@]+@sogang\.ac\.kr$/; // 서강대 메일
const USERNAME_RULE = /^[a-zA-Z0-9]{4,12}$/; // 영문·숫자 4~12자
const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; // 영문+숫자 포함 8자 이상

// 안내 문구 (파란색 = 통과, 빨간색 = 문제)
function Message({ msg }) {
  if (!msg) return null;
  return <p className={msg.ok ? "msg ok" : "msg error"}>{msg.text}</p>;
}

// 동의 질문 (네 / 아니오)
function ConsentQuestion({ name, question, value, onChange }) {
  return (
    <div className="consent">
      <p className="consent-question">{question}</p>
      <div className="consent-options">
        <label>
          네
          <input
            type="radio"
            name={name}
            checked={value === true}
            onChange={() => onChange(true)}
          />
        </label>
        <label>
          아니오
          <input
            type="radio"
            name={name}
            checked={value === false}
            onChange={() => onChange(false)}
          />
        </label>
      </div>
    </div>
  );
}

function SignupPage() {
  
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [agreeInfo, setAgreeInfo] = useState(null);
  const [agreeGroup, setAgreeGroup] = useState(null);

  
  const [studentIdChecked, setStudentIdChecked] = useState(false);
  const [studentIdMsg, setStudentIdMsg] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailMsg, setEmailMsg] = useState(null);

  
  const handleStudentIdChange = (e) => {
    setStudentID(e.target.value);
    setStudentIdChecked(false); 
    setStudentIdMsg(null);
  };

  const handleCheckStudentId = () => {
    if (!STUDENT_ID_RULE.test(studentID)) {
      setStudentIdMsg({ text: "학번 8자리를 숫자로 입력해 주세요.", ok: false });
      return;
    }
    // 백엔드 연결 후 서버에 학번 중복 확인 요청
    setStudentIdChecked(true);
    setStudentIdMsg({ text: "사용 가능한 고유 정보입니다.", ok: true });
  };

  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setCodeSent(false); 
    setEmailVerified(false);
    setCode("");
    setEmailMsg(null);
  };

  const handleSendCode = () => {
    if (!EMAIL_RULE.test(email)) {
      setEmailMsg({ text: "서강대학교 이메일(@sogang.ac.kr)을 입력해 주세요.", ok: false });
      return;
    }
    // 백엔드 연결 후 서버에 인증 메일 발송 요청
    setCodeSent(true);
    setEmailVerified(false);
    setCode("");
    setEmailMsg({ text: "인증 코드를 보냈습니다. 메일함을 확인해 주세요.", ok: true });
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCode(value);
    if (value.length === 6) {
      //백엔드 연결 후 서버에 코드 확인 요청 (지금은 6자리면 통과)
      setEmailVerified(true);
      setEmailMsg({ text: "코드가 확인되었습니다.", ok: true });
    } else {
      setEmailVerified(false);
    }
  };

  
  const usernameMsg =
    username === ""
      ? null
      : USERNAME_RULE.test(username)
      ? { text: "사용 가능한 닉네임입니다.", ok: true }
      : { text: "영문, 숫자 4~12자로 입력해 주세요.", ok: false };

  const passwordMsg =
    password === ""
      ? null
      : PASSWORD_RULE.test(password)
      ? { text: "사용 가능한 비밀번호입니다.", ok: true }
      : { text: "영문과 숫자를 포함해 8자 이상 입력해 주세요.", ok: false };

  const pwConfirmMsg =
    pwConfirm === ""
      ? null
      : pwConfirm === password
      ? { text: "비밀번호가 일치합니다.", ok: true }
      : { text: "비밀번호가 일치하지 않습니다.", ok: false };

  
  const canSubmit =
    name.trim() !== "" &&
    studentIdChecked &&
    emailVerified &&
    usernameMsg?.ok &&
    passwordMsg?.ok &&
    pwConfirmMsg?.ok &&
    agreeInfo === true &&
    agreeGroup === true;

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!canSubmit) return;
    
    console.log("회원가입 요청:", { name, studentID, email, username });
    alert("회원가입 요청 완료 (테스트)");
  };

  return (
    <div className="signup-page">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h1 className="signup-title">회원가입</h1>

        {/* 1. 성명 · 학번 */}
        <section className="signup-section">
          <div className="field">
            <label htmlFor="name">성명</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="studentID">학번</label>
            <div className="input-row">
              <input
                id="studentID"
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={studentID}
                onChange={handleStudentIdChange}
              />
              <button type="button" className="small-btn" onClick={handleCheckStudentId}>
                인증하기
              </button>
            </div>
            <Message msg={studentIdMsg} />
          </div>
        </section>

        {/* 2. 이메일 인증 */}
        <section className="signup-section">
          <div className="field">
            <label htmlFor="email">서강대학교 이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="field">
            <label htmlFor="code">인증 코드</label>
            <div className="input-row">
              <input
                id="code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={handleCodeChange}
                disabled={!codeSent}
              />
              <button type="button" className="small-btn" onClick={handleSendCode}>
                {codeSent ? "재전송" : "인증 코드 보내기"}
              </button>
            </div>
            <Message msg={emailMsg} />
          </div>
        </section>

        {/* 3. 아이디 · 비밀번호 */}
        <section className="signup-section">
          <div className="field">
            <label htmlFor="username">user name</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Message msg={usernameMsg} />
          </div>

          <div className="field">
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Message msg={passwordMsg} />
          </div>

          <div className="field">
            <label htmlFor="pwConfirm">password 확인</label>
            <input
              id="pwConfirm"
              type="password"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
            />
            <Message msg={pwConfirmMsg} />
          </div>
        </section>

        {/* 4. 동의 */}
        <section className="signup-section">
          <ConsentQuestion
            name="agreeInfo"
            question="서강대학교 SGCC 동아리 관리자(회장, 부회장 및 임원진)가 본인의 성명, 학번, 재학 여부를 열람하는 것에 동의하십니까?"
            value={agreeInfo}
            onChange={setAgreeInfo}
          />
          <ConsentQuestion
            name="agreeGroup"
            question="서강대학교 SGCC 동아리 관리자(회장, 부회장 및 임원진)가 본인의 동아리 직책 및 소속된 동아리 내 소모임을 열람 및 관리하는 것에 동의하십니까?"
            value={agreeGroup}
            onChange={setAgreeGroup}
          />
        </section>

        <button type="submit" className="submit-btn" disabled={!canSubmit}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignupPage;