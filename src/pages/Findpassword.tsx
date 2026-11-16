import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Findpassword.css";

function FindpasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("비밀번호 재설정 기능은 아직 연결되지 않았습니다.");
  };

  return (
    <main className="findpassword-page">
      <section className="findpassword-card">
        <h1 className="findpassword-title">비밀번호 찾기</h1>
        <p className="findpassword-description">
          가입할 때 사용한 이메일을 입력해 주세요.
        </p>

        <form className="findpassword-form" onSubmit={handleSubmit}>
          <label htmlFor="findpassword-email">이메일</label>
          <input
            id="findpassword-email"
            type="email"
            autoComplete="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button className="findpassword-submit" type="submit">
            비밀번호 재설정 안내 받기
          </button>
        </form>

        {message && (
          <p className="findpassword-message" role="status">
            {message}
          </p>
        )}

        <button
          className="findpassword-back"
          type="button"
          onClick={() => navigate("/login")}
        >
          로그인으로 돌아가기
        </button>
      </section>
    </main>
  );
}

export default FindpasswordPage;
