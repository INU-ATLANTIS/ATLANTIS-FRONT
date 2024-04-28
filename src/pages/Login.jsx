import styled from 'styled-components'

import { Link } from 'react-router-dom'
import axios from 'axios'
import arrow from '../assets/ArrowLeft.png'
import mailImg from '../assets/Vector.png'
import passwordImg from '../assets/Lock.png'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import { useState } from 'react'

const Container = styled.div`
  width: 400px;
  margin: auto auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto 80px;
  padding: 0 10px;
  font-size: 22px;
`

const Span = styled(Link)``

const Arrow = styled.img`
  width: 24px;
`

const Title = styled.div`
  flex-grow: 1;
  text-align: center;
  margin-right: 15px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  color: #585858;
  padding: 0 10px;
`

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
`

const IdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #585858;
  font-size: 15px;
`

const FindLabel = styled.label``

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
`

const Linkto = styled(Link)`
  color: #004a9e;
  text-decoration: none;
  margin-left: 5px;
`

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState(false)

  const BASE_URL = 'http://43.203.179.227:4000'

  const login = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/sign-in`, {
        email: email,
        password: password,
      })

      if (response.data.code === 'SU') {
        alert('로그인 성공')
        localStorage.setItem('token', response.data.token)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('로그인 요청 중 오류가 발생했습니다.')
      }
    }
  }

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
            icon={mailImg}
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <Label>비밀번호</Label>
        <div>
          <Input
            icon={passwordImg}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={login}>로그인</Button>
        <IdContainer>
          <Checkbox checked={id} onChange={() => setId(!id)}>
            아이디 저장
          </Checkbox>
          <FindLabel>아이디/비밀번호 찾기</FindLabel>
        </IdContainer>
      </Form>
      <Question>
        아직 회원이 아니신가요? <Linkto to="/JoinSpace">회원가입</Linkto>
      </Question>
    </Container>
  )
}

export default Login
