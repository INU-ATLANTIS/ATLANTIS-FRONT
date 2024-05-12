import styled from "styled-components";
import { TopNavigation } from "../components/TopNavigation";
import { useEffect, useState } from "react";
import client from "../lib/client";
import { useNavigate } from "react-router-dom";

export default function UserNotiList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await client.get("/noti/my");
        setNotifications(response.data.userNotiList); // API 응답에서 알람 리스트를 설정
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <Container>
      <TopNavigation />

      <TitleContainer>
        <span>알람 조회</span>
      </TitleContainer>

      <NotificationList>
        {notifications.map((noti) => (
          <li key={noti.notiId}>
            {noti.message} ({noti.dateTime})
          </li>
        ))}
      </NotificationList>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 58px;
  align-items: flex-end;
  padding-left: 16px;
  margin-bottom: 40px;
  margin-top: 56px;

  span {
    color: #111111;
    font-weight: 600;
    font-size: 28px;
    line-height: 38px;
  }
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 80px;
  width: 100vw;

  li {
    padding: 16px;
    border-top: 1px solid #f1f1f5;
  }
`;
