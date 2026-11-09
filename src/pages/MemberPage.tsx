import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MemberPage.css";

// =========================
// 타입 정의
// =========================

type CalendarDay = {
  date: number;
  type: "prev" | "current" | "next";
  fullDate: Date;
};

interface Member {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  status: string;
  position: string;
  groups: string[];
}

interface Project {
  title: string;
  leader: string;
  time: string;
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

const projects: Project[] = [
  {
    title: "웹사이트 프로젝트",
    leader: "정주원",
    time: "월요일 오후 6시",
  },
  {
    title: "웹사이트 프로젝트",
    leader: "정주원",
    time: "월요일 오후 6시",
  },
  {
    title: "웹사이트 프로젝트",
    leader: "정주원",
    time: "월요일 오후 6시",
  },
];

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

const memberFields = [
  { label: "이름", value: member.name },
  { label: "학번", value: member.studentId },
  { label: "이메일", value: member.email, className: "email-row" },
  { label: "전화번호", value: member.phone },
  { label: "학적", value: member.status },
  { label: "직책", value: member.position },
];

// =========================
// 달력 날짜 생성
// =========================

const getCalendarDays = (date: Date): CalendarDay[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const totalWeeks = Math.max(
    5,
    Math.ceil((firstDay + lastDate) / 7)
  );

  return Array.from({ length: totalWeeks * 7 }, (_, index) => {
    const dayNumber = index - firstDay + 1;

    if (dayNumber < 1) {
      const day = prevLastDate + dayNumber;

      return {
        date: day,
        type: "prev",
        fullDate: new Date(year, month - 1, day),
      };
    }

    if (dayNumber > lastDate) {
      const day = dayNumber - lastDate;

      return {
        date: day,
        type: "next",
        fullDate: new Date(year, month + 1, day),
      };
    }

    return {
      date: dayNumber,
      type: "current",
      fullDate: new Date(year, month, dayNumber),
    };
  });
};

// =========================
// 메인 컴포넌트
// =========================

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  // 프로젝트 선택 상태
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  // 월 이동
  const changeMonth = (amount: number) => {
    setCurrentDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + amount,
          1
        )
    );
  };

  // 오늘 날짜로 이동
  const goToday = () => {
    setCurrentDate(new Date());
  };

  const calendarDays = getCalendarDays(currentDate);

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

            <button
              type="button"
              className="edit-button"
              onClick={() => alert("회원정보 수정 기능")}
            >
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

        {/* 오른쪽 콘텐츠 영역 */}
        <section className="content-section">

          {/* 달력 */}
          <div className="calendar-wrapper">

            <div className="calendar-heading">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="이전 달"
              >
                〈
              </button>

              <span>
                {currentDate.getFullYear()}년{" "}
                {currentDate.getMonth() + 1}월
              </span>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="다음 달"
              >
                〉
              </button>

              <button
                type="button"
                className="today-button"
                onClick={goToday}
              >
                오늘
              </button>
            </div>

            {/* 요일 */}
            <div className="weekday-bar">
              {weekdays.map((day, index) => (
                <div
                  key={day}
                  className={
                    index === 0
                      ? "sunday"
                      : index === 6
                      ? "saturday"
                      : ""
                  }
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 달력 날짜: 일반 표시 영역 */}
            <div
              className="calendar-grid"
              style={{
                gridTemplateRows: `repeat(${calendarDays.length / 7}, minmax(0, 1fr))`,
              }}
            >
              {calendarDays.map((day, index) => (
                <div
                  key={`${day.fullDate.toISOString()}-${index}`}
                  className={[
                    "calendar-day",
                    day.type !== "current" ? "other-month" : "",
                  ].filter(Boolean).join(" ")}
                >
                  <span>{day.date}</span>
                </div>
              ))}
            </div>

          </div>

          {/* 프로젝트 카드: 전체 클릭 가능 */}
          <div className="project-list">
            {projects.map((project, index) => (
              <button
                type="button"
                className="project-card"
                key={index}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-title">
                  {project.title}
                </div>

                <div className="project-detail">
                  <p>담당: {project.leader}</p>
                  <p>시간: {project.time}</p>
                </div>
              </button>
            ))}
          </div>

          {/* 프로젝트 선택 정보 */}
          {selectedProject && (
            <div className="selected-project">
              <h3>{selectedProject.title}</h3>
              <p>담당: {selectedProject.leader}</p>
              <p>시간: {selectedProject.time}</p>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
              >
                닫기
              </button>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default App;
