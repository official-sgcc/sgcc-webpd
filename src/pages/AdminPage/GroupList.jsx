import { useEffect, useState } from "react";
import "./GroupList.css";
import api from "../../api/client";

function GroupList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/v1/group/list")
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch(() => {
        setError("소모임 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="group-status">불러오는 중...</p>;
  if (error) return <p className="group-status">{error}</p>;

  return (
    <div className="group-list">
      {groups.map((group) => (
        <div className="group-card" key={group.id}>
          {/* 위쪽 남색 영역 */}
          <div className="group-card-top">
            <h2 className="group-name">{group.name}</h2>
          </div>

          {/* 아래쪽 빨간 영역 */}
          <div className="group-card-bottom">
            {group.users.map((user) => (
              <span className="member-chip" key={user.id}>
                {user.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupList;