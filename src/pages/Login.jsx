import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import arrow from "../assets/ArrowLeft.png";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { useState, useEffect } from "react";
import client from "../lib/client";

const Container = styled.div`
  width: 400px;
  margin: auto auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto 80px;
  padding: 0 10px;
  font-size: 22px;
`;

const Span = styled(Link)``;

const Arrow = styled.img`
  width: 24px;
`;

const Title = styled.div`
  flex-grow: 1;
  text-align: center;
  margin-right: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #585858;
  padding: 0 10px;
`;

const Button = styled(Link)`
  background-color: #004a9e;
  border: none;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  padding: 16px;
  width: 360px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 30px;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
`;

const IdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #585858;
  font-size: 15px;
`;

const Question = styled.div`
  display: flex;
  justify-content: center;
  color: #000000;
  font-size: 14px;

  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 30px;
`;

const Linkto = styled(Link)`
  color: #004a9e;
  text-decoration: none;
  margin-left: 5px;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setSaveId(true);
    }
  }, []);

  const login = async () => {
    try {
      const response = await client.post(`/auth/sign-in`, {
        email: email,
        password: password,
      });

      if (response.data.code === "SU") {
        alert("로그인 성공");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("로그인 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <Header>
        <Span to="/">
          <Arrow src={arrow} alt="이전" />
        </Span>
        <Title>로그인</Title>
      </Header>
      <Form>
        <Label>이메일</Label>
        <div>
          <Input
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Label>비밀번호</Label>
        <div>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={login}>로그인</Button>
        <IdContainer>
          <Checkbox checked={saveId} onChange={() => setSaveId(!saveId)}>
            아이디 저장
          </Checkbox>
        </IdContainer>
      </Form>
      <Question>
        아직 회원이 아니신가요? <Linkto to="/JoinSpace">회원가입</Linkto>
      </Question>
    </Container>
  );
}

export default Login;
