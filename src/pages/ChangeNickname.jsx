import React, { useState } from "react";
import client from "../lib/client";
import { Link } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/ArrowLeft.png";
import Input from "../components/Input";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
  }
`;
const THEMES = {
  light: { backgroundColor: "#ffffff", color: "#000000" },
  dark: { backgroundColor: "#03040c", color: "#ffffff" },
};

const Container = styled.div`
  width: 400px;
  margin: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto 80px;
  padding: 0 10px;
  font-size: 22px;
`;
const Arrow = styled.img`
  width: 24px;
`;
const Title = styled.div`
  flex-grow: 1;
  text-align: center;
  margin-right: 15px;
`;
const Span = styled(Link)``;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
`;

const Button = styled(Link)`
  background-color: #004a9e;
  border: none;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  padding: 0 16px;
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px 0 0;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
`;

function ChangeNickname() {
  const [newNickname, setNewNickname] = useState("");
  const navigate = useNavigate();

  // 닉네임 수정 함수
  const updateNickname = async () => {
    try {
      const token = localStorage.getItem("token");
      await client.patch(
        `/user/nickname`,
        { nickname: newNickname },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("닉네임이 성공적으로 변경되었습니다.");
      navigate("/LoginUserInfo");
    } catch (error) {
      alert("닉네임 변경에 실패했습니다.");
    }
  };
  return (
    <ThemeProvider theme={THEMES["light"]}>
      <Container>
        <GlobalStyle />
        <Header>
          <Span to="/loginUserInfo">
            <Arrow src={arrow} alt="이전" />
          </Span>
          <Title>닉네임 변경</Title>
        </Header>
        <Form>
          <Input
            type="text"
            placeholder="새 닉네임"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <Button onClick={updateNickname}>변경</Button>
        </Form>
      </Container>
    </ThemeProvider>
  );
}

export default ChangeNickname;
