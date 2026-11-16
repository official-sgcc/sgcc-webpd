
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MemberPage.css";

// =========================
// API 설정
// =========================

// 서버 주소가 없으면 자동으로 임시 데이터 모드 사용
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || ""
).replace(/\/$/, "");

const USER_ID = localStorage.getItem("user_id");

// 임시 데이터 저장 키
const STORAGE_KEY = "sgcc_member_data";

// =========================
// 타입 정의
// =========================

type CalendarDay = {
  date: number;
  type: "prev" | "current" | "next";
  fullDate: Date;
};

type UserStatus = "재학" | "휴학" | "졸업";

interface Group {
  id: string;
  name: string;
  type: "소모임" | "프로젝트";
  image: string | null;
  info: string | null;
  manager: string | null;
}

interface Member {
  id: string;
  name: string;
  student_id: string;
  grade: number;
  phone: string | null;
  status: UserStatus;
  role: string | null;
  image: string | null;
  groups: Group[];
}

interface MemberForm {
  name: string;
  student_id: string;
  grade: number;
  phone: string;
  status: UserStatus;
  role: string;
  image: string;
}

interface Project {
  id: string;
  title: string;
}

// =========================
// 임시 회원 데이터
// =========================

const mockMember: Member = {
  id: "demo-user",
  name: "이종훈",
  student_id: "20261247",
  grade: 1,
  phone: "010-0000-5091",
  status: "재학",
  role: "일반 회원",
  image: null,

  groups: [
    {
      id: "group-1",
      name: "C언어 스터디",
      type: "소모임",
      image: null,
      info: null,
      manager: null,
    },
    {
      id: "group-2",
      name: "게임 프로젝트",
      type: "프로젝트",
      image: null,
      info: null,
      manager: null,
    },
    {
      id: "group-3",
      name: "웹사이트 프로젝트",
      type: "프로젝트",
      image: null,
      info: null,
      manager: null,
    },
  ],
};

// =========================
// 회원 데이터 불러오기
// =========================

const fetchMember = async (): Promise<Member> => {

  // 서버 주소가 없으면 임시 데이터 사용
  if (!API_BASE_URL) {
    const savedData = localStorage.getItem(STORAGE_KEY);

    return savedData
      ? JSON.parse(savedData)
      : mockMember;
  }

  // 실제 API 사용 시 UUID 필요
  if (!USER_ID) {
    throw new Error(
      "회원 ID가 없습니다. 다시 로그인해 주세요."
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/v1/user/${USER_ID}`
  );

  if (!response.ok) {
    throw new Error("회원 정보를 불러오지 못했습니다.");
  }

  const result = await response.json();

  return result.data;
};

// =========================
// 회원 정보 수정
// =========================

const updateMember = async (
  form: MemberForm,
  currentMember: Member
): Promise<Member> => {

  // 서버 주소가 없으면 브라우저에 저장
  if (!API_BASE_URL) {

    const updatedMember: Member = {
      ...currentMember,
      ...form,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedMember)
    );

    return updatedMember;
  }

  if (!USER_ID) {
    throw new Error("회원 ID가 없습니다.");
  }

  // 실제 API로 전송
  const response = await fetch(
    `${API_BASE_URL}/v1/user/${USER_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        student_id: form.student_id,
        grade: Number(form.grade),
        phone: form.phone || null,
        status: form.status,
        role: form.role || null,
        image: form.image || null,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("회원 정보 수정에 실패했습니다.");
  }

  const result = await response.json();

  return result.data;
};

// =========================
// 요일
// =========================

const weekdays = [
  "일", "월", "화", "수", "목", "금", "토"
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

  return Array.from(
    { length: totalWeeks * 7 },
    (_, index) => {

      const dayNumber = index - firstDay + 1;

      if (dayNumber < 1) {
        const day = prevLastDate + dayNumber;

        return {
          date: day,
          type: "prev" as const,
          fullDate: new Date(year, month - 1, day),
        };
      }

      if (dayNumber > lastDate) {
        const day = dayNumber - lastDate;

        return {
          date: day,
          type: "next" as const,
          fullDate: new Date(year, month + 1, day),
        };
      }

      return {
        date: dayNumber,
        type: "current" as const,
        fullDate: new Date(year, month, dayNumber),
      };
    }
  );
};

// =========================
// 메인 컴포넌트
// =========================

function MemberPage() {

  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());

  // 회원 정보
  const [member, setMember] = useState<Member | null>(null);

  // 수정 상태
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState<MemberForm>({
    name: "",
    student_id: "",
    grade: 1,
    phone: "",
    status: "재학",
    role: "",
    image: "",
  });

  // 로딩 및 오류
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // =========================
  // 회원 정보 불러오기
  // =========================

  useEffect(() => {

    const loadMember = async () => {

      try {

        const data = await fetchMember();

        setMember(data);

        setEditForm({
          name: data.name,
          student_id: data.student_id,
          grade: data.grade,
          phone: data.phone || "",
          status: data.status,
          role: data.role || "",
          image: data.image || "",
        });

      } catch (err) {

        setError(
          err instanceof Error
            ? err.message
            : "회원 정보를 불러오지 못했습니다."
        );

      } finally {

        setLoading(false);

      }
    };

    loadMember();

  }, []);

  // =========================
  // 회원 정보 수정
  // =========================

  const handleEditChange = (
    field: keyof MemberForm,
    value: string
  ) => {

    setEditForm((prev) => ({
      ...prev,
      [field]:
        field === "grade"
          ? Number(value)
          : value,
    }));
  };

  // 수정 시작
  const handleEdit = () => {

    if (!member) return;

    setEditForm({
      name: member.name,
      student_id: member.student_id,
      grade: member.grade,
      phone: member.phone || "",
      status: member.status,
      role: member.role || "",
      image: member.image || "",
    });

    setError("");
    setIsEditing(true);
  };

  // 수정 취소
  const handleCancel = () => {

    if (!member) return;

    setEditForm({
      name: member.name,
      student_id: member.student_id,
      grade: member.grade,
      phone: member.phone || "",
      status: member.status,
      role: member.role || "",
      image: member.image || "",
    });

    setError("");
    setIsEditing(false);
  };

  // 수정 내용 저장
  const handleSave = async () => {

    if (!member) return;

    if (!editForm.name.trim()) {
      setError("이름을 입력해 주세요.");
      return;
    }

    try {

      setSaving(true);
      setError("");

      const updatedMember = await updateMember(
        editForm,
        member
      );

      setMember(updatedMember);
      setIsEditing(false);

      alert(
        API_BASE_URL
          ? "회원 정보가 서버에 저장되었습니다."
          : "회원 정보가 임시 저장되었습니다."
      );

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "회원 정보 저장에 실패했습니다."
      );

    } finally {

      setSaving(false);

    }
  };

  // =========================
  // 달력 이동
  // =========================

  const changeMonth = (amount: number) => {

    setCurrentDate((prev) =>
      new Date(
        prev.getFullYear(),
        prev.getMonth() + amount,
        1
      )
    );
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const calendarDays = getCalendarDays(currentDate);

  // 프로젝트 목록
  const projects: Project[] =
    member?.groups
      .filter((group) => group.type === "프로젝트")
      .map((group) => ({
        id: group.id,
        title: group.name,
      })) || [];

  // =========================
  // 로딩 화면
  // =========================

  if (loading) {
    return (
      <div className="app-container">
        <p>회원 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="app-container">
        <p>{error || "회원 정보를 찾을 수 없습니다."}</p>

        <button onClick={() => navigate("/login")}>
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  // =========================
  // 화면
  // =========================

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

            <div className="profile-image">

              {member.image && (
                <img
                  src={member.image}
                  alt="회원 프로필"
                />
              )}

            </div>

            <button
              type="button"
              className="edit-button"
              onClick={
                isEditing
                  ? handleCancel
                  : handleEdit
              }
            >
              {isEditing ? "취소" : "수정하기"}
            </button>

          </div>

          {/* 회원 정보 */}
          <div className="member-info">

            {isEditing ? (

              <div className="member-edit-form">

                <div className="info-row">
                  <span>이름</span>

                  <input
                    value={editForm.name}
                    onChange={(e) =>
                      handleEditChange("name", e.target.value)
                    }
                  />
                </div>

                <div className="info-row">
                  <span>학번</span>

                  <input
                    value={editForm.student_id}
                    onChange={(e) =>
                      handleEditChange(
                        "student_id",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="info-row">
                  <span>학년</span>

                  <input
                    type="number"
                    min="1"
                    value={editForm.grade}
                    onChange={(e) =>
                      handleEditChange("grade", e.target.value)
                    }
                  />
                </div>

                <div className="info-row">
                  <span>전화번호</span>

                  <input
                    value={editForm.phone}
                    onChange={(e) =>
                      handleEditChange("phone", e.target.value)
                    }
                  />
                </div>

                <div className="info-row">
                  <span>학적</span>

                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      handleEditChange("status", e.target.value)
                    }
                  >
                    <option value="재학">재학</option>
                    <option value="휴학">휴학</option>
                    <option value="졸업">졸업</option>
                  </select>
                </div>

                <div className="info-row">
                  <span>직책</span>

                  <input
                    value={editForm.role}
                    onChange={(e) =>
                      handleEditChange("role", e.target.value)
                    }
                  />
                </div>

                <div className="info-row">
                  <span>프로필 이미지</span>

                  <input
                    value={editForm.image}
                    placeholder="이미지 URL"
                    onChange={(e) =>
                      handleEditChange("image", e.target.value)
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "저장 중..." : "저장하기"}
                </button>

              </div>

            ) : (

              <>

                <div className="info-row">
                  <span>이름</span>
                  <p>{member.name}</p>
                </div>

                <div className="info-row">
                  <span>학번</span>
                  <p>{member.student_id}</p>
                </div>

                <div className="info-row">
                  <span>학년</span>
                  <p>{member.grade}학년</p>
                </div>

                <div className="info-row">
                  <span>전화번호</span>
                  <p>{member.phone || "-"}</p>
                </div>

                <div className="info-row">
                  <span>학적</span>
                  <p>{member.status}</p>
                </div>

                <div className="info-row">
                  <span>직책</span>
                  <p>{member.role || "-"}</p>
                </div>

                {/* 소모임 */}
                <div className="info-row group-row">

                  <span>소모임</span>

                  <div className="group-list">

                    {member.groups
                      .filter(
                        (group) => group.type === "소모임"
                      )
                      .map((group) => (

                        <span
                          className="group-tag"
                          key={group.id}
                        >
                          {group.name}
                        </span>

                      ))}

                  </div>

                </div>

              </>

            )}

          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

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

            {/* 날짜 */}
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
                    day.type !== "current"
                      ? "other-month"
                      : "",
                  ].filter(Boolean).join(" ")}
                >
                  <span>{day.date}</span>
                </div>

              ))}

            </div>

          </div>

          {/* 프로젝트 카드 */}
          <div className="project-list">

            {projects.length > 0 ? (

              projects.map((project) => (

                <button
                  type="button"
                  className="project-card"
                  key={project.id}
                  onClick={() => navigate("/project")}
                >

                  <div className="project-title">
                    {project.title}
                  </div>

                  <div className="project-detail">
                    <p>프로젝트</p>
                  </div>

                </button>

              ))

            ) : (

              <p>참여 중인 프로젝트가 없습니다.</p>

            )}

          </div>

        </section>

      </main>

    </div>

  );
}

export default MemberPage;
