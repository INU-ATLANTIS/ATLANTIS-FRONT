import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import arrow from '../assets/ArrowLeft.png'
import mailImg from '../assets/Vector.png'
import passwordImg from '../assets/Lock.png'
import Input from '../components/Input'
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
  margin: 20px 20px 60px;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
`

const SmallButton = styled.button`
  background-color: #004a9e;
  border: none;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  padding: 16px;
  width: 360px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 20px;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
`

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

function JoinSpace() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [certificationNumber, setCertificationNumber] = useState('')

  const navigate = useNavigate()

  const BASE_URL = 'http://43.203.179.227:4000'

  //오류
  const handleErrorResponse = error => {
    let errorMessage = '알 수 없는 오류가 발생했습니다.'

    if (error.response) {
      const { code, message } = error.response.data
      switch (code) {
        case 'VF':
          errorMessage = '유효성 검사에 실패했습니다. 입력값을 확인해주세요.'
          break
        case 'DE':
          errorMessage = '이미 등록된 이메일입니다.'
          break
        case 'CF':
          errorMessage = '인증번호 확인에 실패했습니다.'
          break
        case 'DBE':
          errorMessage = '데이터베이스 오류가 발생했습니다.'
          break
        default:
          errorMessage = message
      }
    } else if (error.request) {
      errorMessage =
        '서버로부터 응답을 받지 못했습니다. 네트워크 상태를 확인해주세요.'
    } else {
      errorMessage = '요청을 보내는 중 문제가 발생했습니다.'
    }

    alert(errorMessage)
  }

  //이메일 중복 체크
  const checkEmailDuplication = async e => {
    e.preventDefault()
    const fullEmail = `${email}@inu.ac.kr`
    console.log(`Checking duplication for: ${fullEmail}`)

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/email-check`, {
        email: fullEmail,
      })

      if (response.status === 200 && response.data.code === 'SU') {
        alert('사용 가능한 이메일입니다.')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      handleErrorResponse(error)
    }
  }

  //인증번호 받기
  const requestCertificationNumber = async e => {
    e.preventDefault()
    const fullEmail = `${email}@inu.ac.kr`
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/email-certification`,
        {
          email: fullEmail,
        }
      )

      if (response.status === 200 && response.data.code === 'SU') {
        alert('인증번호가 이메일로 발송되었습니다.')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      handleErrorResponse(error)
    }
  }

  //인증번호 확인
  const verifyCertificationNumber = async e => {
    e.preventDefault()
    const fullEmail = `${email}@inu.ac.kr`
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/check-certification`,
        {
          email: fullEmail,
          certificationNumber: certificationNumber,
        }
      )

      if (response.status === 200 && response.data.code === 'SU') {
        alert('이메일 인증이 성공적으로 완료되었습니다.')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      handleErrorResponse(error)
    }
  }

  //회원가입
  const register = async e => {
    e.preventDefault()
    const fullEmail = `${email}@inu.ac.kr`
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/sign-up`, {
        email: fullEmail,
        password: password,
        certificationNumber: certificationNumber,
      })

      if (response.status === 200 && response.data.code === 'SU') {
        alert('회원가입이 성공적으로 완료되었습니다.')
        navigate('/LoginSpace')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      handleErrorResponse(error)
    }
  }

  return (
    <Container>
      <Header>
        <Span to="/">
          <Arrow src={arrow} alt="이전" />
        </Span>
        <Title>가입하기</Title>
      </Header>
      <Form>
        <Label>이메일</Label>
        <div>
          <Input
            icon={mailImg}
            type="text"
            placeholder="@inu.ac.kr 앞부분을 넣어주세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <SmallButton onClick={checkEmailDuplication}>중복체크</SmallButton>
          <SmallButton onClick={requestCertificationNumber}>
            인증번호 받기
          </SmallButton>
        </div>
        <div>
          <Label>인증번호</Label>
          <Input
            icon={passwordImg}
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={certificationNumber}
            onChange={e => setCertificationNumber(e.target.value)} // 상태 업데이트
          />
          <SmallButton onClick={verifyCertificationNumber}>
            인증번호 확인
          </SmallButton>
        </div>
        <Label>비밀번호</Label>
        <div>
          <Input
            icon={passwordImg}
            type="password"
            placeholder="비밀번호를 입력해주세요(영어+숫자 8자리 이상)"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={register}>회원가입</Button>
      </Form>
      <Question>
        이미 계정이 있으신가요? <Linkto to="/LoginSpace">로그인</Linkto>
      </Question>
    </Container>
  )
}

export default JoinSpace
