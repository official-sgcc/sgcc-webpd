import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberInfoChange.css";

// =========================
// 타입 정의
// =========================

interface Member {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  status: string;
  position: string;
  groups: string[];
}

// =========================
// 데이터
// =========================

const member: Member = {
  name: "이종훈",
  studentId: "20261247",
  email: "jjo******@gmail.com",
  phone: "010-****-5091",
  status: "재학",
  position: "일반 회원",
  groups: [
    "C언어 스터디",
    "게임 프로젝트",
    "웹사이트 프로젝트",
  ],
};

// =========================
// 메인 컴포넌트
// =========================

function MemberPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(member);
  const [form, setForm] = useState({
    name: member.name,
    email: "",
    emailCode: "",
    password: "",
    passwordConfirm: "",
  });
  const [saveMessage, setSaveMessage] = useState("");
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailMessage, setEmailMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const memberFields: { label: string; value: string; className?: string }[] = [
    { label: "이름", value: profile.name },
    { label: "학번", value: profile.studentId },
    { label: "이메일", value: profile.email, className: "email-row" },
    { label: "전화번호", value: profile.phone },
    { label: "학적", value: profile.status },
    { label: "직책", value: profile.position },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.email.trim() && !emailVerified) {
      setSaveMessage("새 이메일 인증을 먼저 완료해 주세요.");
      return;
    }

    if (form.password && form.password.length < 8) {
      setSaveMessage("새 비밀번호는 8자 이상 입력해 주세요.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setSaveMessage("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setProfile((current) => ({
      ...current,
      name: form.name.trim(),
      email: form.email.trim() || current.email,
    }));
    setForm((current) => ({
      ...current,
      emailCode: "",
      password: "",
      passwordConfirm: "",
    }));
    setSaveMessage(
      "입력 내용은 화면에 반영했어요. 이메일 발송·인증과 비밀번호 변경을 실제 계정에 저장하려면 서버 연결이 필요합니다."
    );
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleEmailChange = (value: string) => {
    setForm((current) => ({ ...current, email: value, emailCode: "" }));
    setEmailCodeSent(false);
    setEmailVerified(false);
    setEmailMessage(null);
    setSaveMessage("");
  };

  const handleSendEmailCode = () => {
    const email = form.email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailMessage({ text: "올바른 이메일 주소를 입력해 주세요.", isError: true });
      return;
    }

    setForm((current) => ({ ...current, emailCode: "" }));
    setEmailCodeSent(true);
    setEmailVerified(false);
    setEmailMessage({
      text: "인증 코드 입력창을 열었습니다. 실제 이메일 발송은 서버 연결이 필요합니다.",
      isError: false,
    });
    setSaveMessage("");
  };

  const handleEmailCodeChange = (value: string) => {
    const emailCode = value.replace(/\D/g, "").slice(0, 6);
    setForm((current) => ({ ...current, emailCode }));

    if (emailCode.length === 6) {
      setEmailVerified(true);
      setEmailMessage({
        text: "시연용 인증 확인이 완료되었습니다. 실제 코드 확인은 서버 연결이 필요합니다.",
        isError: false,
      });
    } else {
      setEmailVerified(false);
      setEmailMessage(null);
    }
  };

  return (
    <div className="app-container">

      {/* 상단 헤더 */}
      <header className="header">
        <div className="logo-area">
          <h1>SGCC</h1>
          <span>회원 페이지</span>
        </div>
        <div className="header-right">
          <button
            type="button"
            className="page-switch-button"
            onClick={() => navigate("/admin")}
           
>
          ⇄ 관리자 페이지
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={() => navigate("/login")}
          >
            ⇥ logout
         </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="main-container">

        {/* 왼쪽 회원정보 영역 */}
        <aside className="profile-section">

          <div className="profile-top">
            <div className="profile-image"></div>

            <button type="button" className="edit-button">
              수정하기
            </button>
          </div>

          {/* 회원 정보 */}
          <div className="member-info">

            {memberFields.map((field) => (
              <div
                className={`info-row ${field.className || ""}`}
                key={field.label}
              >
                <span>{field.label}</span>
                <p>{field.value}</p>
              </div>
            ))}

            {/* 소모임 */}
            <div className="info-row group-row">
              <span>소모임</span>

              <div className="group-list">
                {member.groups.map((group, index) => (
                  <span
                    className="group-tag"
                    key={`${group}-${index}`}
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* SNS 링크 */}
          <div className="social-area">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>◉</span> GitHub
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>◎</span> Instagram
            </a>
          </div>

        </aside>

        {/* 오른쪽 회원정보 수정 영역 */}
        <section className="content-section member-edit-section">
          <div className="member-edit-card">
            <div className="edit-heading">
              <h2>회원정보 수정</h2>
              <p>변경할 정보를 입력해 주세요.</p>
            </div>

            <form className="member-edit-form" onSubmit={handleSubmit}>
            <label className="edit-field">
              <span>이름</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="이름을 입력하세요"
                autoComplete="name"
                required
              />
            </label>

            <div className="edit-field">
              <label htmlFor="change-email">이메일</label>
              <div className="email-edit-row">
                <input
                  id="change-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => handleEmailChange(event.target.value)}
                  placeholder="변경할 이메일을 입력하세요"
                  autoComplete="email"
                />
                <button
                  className="email-code-button"
                  type="button"
                  onClick={handleSendEmailCode}
                >
                  {emailCodeSent ? "코드 재전송" : "인증 코드 보내기"}
                </button>
              </div>
              {emailMessage && !emailCodeSent && (
                <small className={emailMessage.isError ? "field-error" : "field-note"}>
                  {emailMessage.text}
                </small>
              )}
            </div>

            {emailCodeSent && (
              <div className="edit-field email-code-field">
                <label htmlFor="email-verification-code">이메일 인증 코드</label>
                <input
                  id="email-verification-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={form.emailCode}
                  onChange={(event) =>
                    handleEmailCodeChange(event.target.value)
                  }
                  placeholder="6자리 인증 코드"
                />
                {emailMessage && (
                  <small className={emailMessage.isError ? "field-error" : "field-note"}>
                    {emailMessage.text}
                  </small>
                )}
                {emailVerified && (
                  <span className="verification-complete">인증 완료</span>
                )}
              </div>
            )}

            <label className="edit-field">
              <span>새 비밀번호</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="변경할 때만 입력하세요"
                autoComplete="new-password"
                minLength={8}
              />
              <small>비밀번호는 8자 이상 입력해 주세요.</small>
            </label>

            <label className="edit-field">
              <span>새 비밀번호 확인</span>
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    passwordConfirm: event.target.value,
                  }))
                }
                placeholder="새 비밀번호를 다시 입력하세요"
                autoComplete="new-password"
                minLength={8}
              />
              {form.passwordConfirm && (
                <small
                  className={
                    form.password === form.passwordConfirm
                      ? "field-note"
                      : "field-error"
                  }
                >
                  {form.password === form.passwordConfirm
                    ? "비밀번호가 일치합니다."
                    : "비밀번호가 일치하지 않습니다."}
                </small>
              )}
            </label>

            <div className="edit-actions">
              <button
                className="cancel-edit-button"
                type="button"
                onClick={handleCancel}
              >
                취소
              </button>
              <button className="save-edit-button" type="submit">
                수정 완료
              </button>
            </div>

            {saveMessage && (
              <p className="save-message" role="status">
                {saveMessage}
              </p>
            )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MemberPage;
