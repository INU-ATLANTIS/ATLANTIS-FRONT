import styled, { css } from 'styled-components'

import { Link, useNavigate } from 'react-router-dom'
import Checkbox from '../components/Checkbox'
import { useState, useEffect } from 'react'
import client from '../lib/client'
import { TopNavigation } from '../components/TopNavigation'
import { HXAP } from '../bridge'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 118px;
  padding: 16px;
  position: fixed;
  bottom: 0px;
  left: 0px;
`

const Top = styled.div`
  padding: 20px 16px 0px;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  color: #111111;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 16px;
`

const Label = styled.label`
  font-size: 12px;
  line-height: 18px;
  color: #505050;
`

const Input = styled.input`
  border: none;
  font-size: 20px;
  line-height: 34px;
  color: #111111;
  margin: 0;

  &::placeholder {
    color: #999999;
  }
`

const InputBottomLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f1f1f5;
`

const Button = styled.button`
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  min-height: 52px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${({ theme }) => css`
    background-color: ${theme.primaryColor};
  `};
`

const TextButton = styled(Link)`
  padding: 8px 4px;
  font-size: 13px;
  line-height: 18px;
  color: #767676;
  margin-top: 8px;
  text-decoration: underline;
`

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saveId, setSaveId] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail')
    if (savedEmail) {
      setEmail(savedEmail)
      setSaveId(true)
    }
  }, [])

  const login = async () => {
    try {
      const response = await client.post(`/auth/sign-in`, {
        email: email,
        password: password,
      })

      if (response.data.code === 'SU') {
        alert('로그인 성공')
        HXAP.saveData('token', response.data.token)

        navigate('/home')
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
      <TopNavigation />
      <Top>로그인</Top>
      <div style={{ height: 40 }}></div>
      <InputContainer>
        <Label>이메일</Label>
        <Input
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <InputBottomLine />
      </InputContainer>
      <div style={{ height: 20 }}></div>
      <InputContainer>
        <Label>비밀번호</Label>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <InputBottomLine />
      </InputContainer>
      <div style={{ height: 30 }}></div>
      <Checkbox checked={saveId} onChange={() => setSaveId(!saveId)}>
        아이디 저장
      </Checkbox>
      <BottomContainer>
        <div style={{ height: 118 }}></div>

        <Button onClick={login}>로그인</Button>

        <TextButton to="/join">아직 회원이 아니신가요?</TextButton>
      </BottomContainer>
    </Container>
  )
}

export default Login
