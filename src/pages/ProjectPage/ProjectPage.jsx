
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectPage.css";

function ProjectPage() {
  const navigate = useNavigate();

  // 뒤로가기
  const handleBack = () => {
    navigate(-1);
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="project-page">

      {/* 상단 헤더 */}
      <header className="project-header">
        <div className="project-header-title">
          <strong>SGCC</strong>
          <span>회원 페이지</span>
        </div>

        <button
          type="button"
          className="project-logout-button"
          onClick={handleLogout}
        >
          ⇥ logout
        </button>
      </header>

      {/* 뒤로가기 메뉴 */}
      <nav className="project-navigation">
        <button
          type="button"
          className="project-back-button"
          onClick={handleBack}
        >
          ← 뒤로가기
        </button>
      </nav>

      {/* 프로젝트 콘텐츠 영역 */}
      <main className="project-main">

        <section className="project-content-window">

          {/* 상단 남색 영역 */}
          <div className="project-content-header">
          </div>

          {/* 프로젝트 상세 내용 영역 */}
          <div className="project-content-body">
          </div>

        </section>

      </main>

      {/* 하단 SNS 영역 */}
      <footer className="project-footer">
        <div className="project-social-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            ◉ GitHub
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            ◎ Instagram
          </a>
        </div>
      </footer>

    </div>
  );
}

export default ProjectPage;
