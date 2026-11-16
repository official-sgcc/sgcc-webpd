
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

// ===================================
// 가운데 회원 검색 컴포넌트
// ===================================

function MemberList() {
  const [search, setSearch] = useState("");

  const members = [
    { id: 1, name: "홍길동", studentId: "20260001" },
    { id: 2, name: "고길동", studentId: "20260002" },
  ];

  // 이름 또는 학번으로 회원 검색
  const searchMembers = members.filter(
    (member) =>
      member.name.includes(search) ||
      member.studentId.includes(search)
  );

  return (
    <section className="member-section">

      {/* 회원 검색창 */}
      <div className="member-search">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="회원 이름 또는 학번 검색"
        />
      </div>

      {/* 회원 검색 필터 */}
      <div className="member-filter">

        <div className="filter-item">
          <label>학년</label>
          <select defaultValue="1학년">
            <option>1학년</option>
            <option>2학년</option>
            <option>3학년</option>
            <option>4학년</option>
          </select>
        </div>

        <div className="filter-item">
          <label>학적</label>
          <select defaultValue="재학">
            <option>재학</option>
            <option>휴학</option>
            <option>졸업</option>
          </select>
        </div>

        <div className="filter-item">
          <label>직책</label>
          <select defaultValue="일반 회원">
            <option>일반 회원</option>
            <option>관리자</option>
          </select>
        </div>

        <div className="filter-item">
          <label>소모임</label>
          <select defaultValue="웹사이트 프로젝트">
            <option>웹사이트 프로젝트</option>
            <option>게임 프로젝트</option>
            <option>C언어 스터디</option>
          </select>
        </div>

      </div>

      {/* 회원 목록 */}
      <div className="member-list">

        {searchMembers.length > 0 ? (
          searchMembers.map((member) => (
            <div className="member-item" key={member.id}>

              <div className="member-profile"></div>

              <span>이름 : {member.name}</span>

              <span>학번 : {member.studentId}</span>

            </div>
          ))
        ) : (
          <p className="no-member">
            검색 결과가 없습니다.
          </p>
        )}

      </div>

    </section>
  );
}


// ===================================
// 관리자 페이지
// ===================================

function AdminPage() {
  const navigate = useNavigate();

  // 관리자 정보
  const admin = {
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

  // 프로젝트별 참여 회원
  const projectGroups = [
    {
      id: 1,
      title: "웹사이트 프로젝트",
      members: [
        "정주원",
        "김도현",
        "김보상",
        "김태성",
        "민경태",
        "이노을",
        "최재원",
        "최재원",
        "이종훈",
        "하서정",
      ],
    },
    {
      id: 2,
      title: "웹사이트 프로젝트",
      members: [
        "정주원",
        "김도현",
        "김보상",
        "김태성",
        "민경태",
        "이노을",
        "최재원",
        "최재원",
        "이종훈",
        "하서정",
      ],
    },
  ];

  // 사용자 페이지 이동
  const handleUserPage = () => {
    navigate("/");
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // 관리자 정보 수정
  const handleEdit = () => {
    alert("관리자 정보 수정 기능을 준비 중입니다.");
  };

  return (
    <div className="app-container admin-page">

      {/* ===================================
          상단 헤더
      =================================== */}

      <header className="header">

        <div className="logo-area">
          <h1>SGCC</h1>
          <span>관리자 페이지</span>
        </div>

        <div className="header-right">

          <button
            type="button"
            className="page-switch-button"
            onClick={handleUserPage}
          >
            ⇄ 사용자 페이지
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            ⇥ logout
          </button>

        </div>

      </header>


      {/* ===================================
          메인 콘텐츠
      =================================== */}

      <main className="admin-main-container">

        {/* ===================================
            왼쪽 관리자 프로필
        =================================== */}

        <aside className="profile-section admin-profile-section">

          {/* 프로필 이미지 및 수정 버튼 */}
          <div className="profile-top">

            <div className="profile-image"></div>

            <button
              type="button"
              className="edit-button"
              onClick={handleEdit}
            >
              수정하기
            </button>

          </div>


          {/* 관리자 정보 */}
          <div className="member-info admin-member-info">

            <div className="info-row">
              <span>이름</span>
              <p>{admin.name}</p>
            </div>

            <div className="info-row">
              <span>학번</span>
              <p>{admin.studentId}</p>
            </div>

            <div className="info-row email-row">
              <span>이메일</span>
              <p>{admin.email}</p>
            </div>

            <div className="info-row">
              <span>전화번호</span>
              <p>{admin.phone}</p>
            </div>

            <div className="info-row">
              <span>학적</span>
              <p>{admin.status}</p>
            </div>

            <div className="info-row">
              <span>직책</span>
              <p>{admin.position}</p>
            </div>

            <div className="info-row group-row">
              <span>소모임</span>

              <div className="group-list">
                {admin.groups.map((group, index) => (
                  <span className="group-tag" key={index}>
                    {group}
                  </span>
                ))}
              </div>

            </div>

          </div>


          {/* 하단 SNS */}
          <div className="social-area">

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>◉</span> GitHub
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>◎</span> Instagram
            </a>

          </div>

        </aside>


        {/* ===================================
            가운데 회원 검색
        =================================== */}

        <section className="admin-search-container">

          <MemberList />

        </section>


        {/* ===================================
            오른쪽 프로젝트 목록
        =================================== */}

        <section className="admin-project-section">

          <div className="admin-project-list">

            {projectGroups.map((project) => (

              <article
                className="admin-project-card"
                key={project.id}
              >

                {/* 프로젝트 제목 */}
                <div className="admin-project-title">

                  <h2>{project.title}</h2>

                </div>


                {/* 프로젝트 참여 회원 */}
                <div className="admin-project-members">

                  {project.members.map((member, index) => (

                    <span
                      className="admin-member-tag"
                      key={`${project.id}-${index}`}
                    >
                      {member}
                    </span>

                  ))}

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminPage;
