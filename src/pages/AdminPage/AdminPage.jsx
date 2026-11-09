import { useState } from 'react'
import './AdminPage.css'

function MemberList() {
    const [search, setSearch] = useState('')

    const members = [
        { id: 1, name: '홍길동', studentId: '20260001' },
        { id: 2, name: '고길동', studentId: '20260002' }
    ]

    const searchMembers = members.filter((member) =>
        member.name.includes(search) || member.studentId.includes(search)
    )

    return (
        <section className="member-section">
            <div className="member-search">
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>

            <div className="member-filter">
                <div className="filter-item">
                    <label>학년</label>
                    <select>
                        <option>1학년</option>
                        <option>2학년</option>
                        <option>3학년</option>
                        <option>4학년</option>
                    </select>
                </div>

                <div className="filter-item">
                    <label>학적</label>
                    <select>
                        <option>재학</option>
                        <option>휴학</option>
                        <option>졸업</option>
                    </select>
                </div>

                <div className="filter-item">
                    <label>직책</label>
                    <select>
                        <option>일반 회원</option>
                        <option>관리자</option>
                    </select>
                </div>

                <div className="filter-item">
                    <label>소모임</label>
                    <select>
                        <option>웹사이트 프로젝트</option>
                        <option>게임 프로젝트</option>
                        <option>C언어 스터디</option>
                    </select>
                </div>
            </div>

            <div className="member-list">
                {searchMembers.map((member) => (
                    <div className="member-item" key={member.id}>
                        <div className="member-profile"></div>
                        <span>이름 : {member.name}</span>
                        <span>학번 : {member.studentId}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MemberList;