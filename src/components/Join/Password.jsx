import { useState } from 'react'
import styled from 'styled-components'
import client from '../../lib/client'
import { useNavigate } from 'react-router-dom'

export function Password({ email, verificationNum }) {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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

  const register = async e => {
    e.preventDefault()

    if (password !== confirmPassword) return alert('비밀번호가 일치하지 않아요')

    try {
      const response = await client.post(`/auth/sign-up`, {
        email,
        password: password,
        certificationNumber: verificationNum,
      })

      if (response.status === 200 && response.data.code === 'SU') {
        alert('회원가입이 성공적으로 완료되었습니다.')
        navigate('/login')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      handleErrorResponse(error)
    }
  }

  return (
    <>
      <Top>비밀번호를 설정해주세요</Top>

      <div style={{ height: 40 }}></div>

      <InputContainer>
        <Label>비밀번호</Label>
        <PasswordInput
          type="password"
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <InputBottomLine />
      </InputContainer>

      <div style={{ height: 32 }}></div>

      <InputContainer>
        <Label>비밀번호 확인</Label>
        <PasswordInput
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.currentTarget.value)}
        />
        <InputBottomLine />
      </InputContainer>

      <BottomContainer>
        <div style={{ height: 84 }}></div>

        <Button variant="primary" onClick={register}>
          회원가입
        </Button>
      </BottomContainer>
    </>
  )
}

const Top = styled.div`
  padding: 20px 16px 0px;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  color: #111111;
`

const PasswordInput = styled.input`
  border: none;
  font-size: 24px;
  line-height: 34px;

  &::placeholder {
    color: #999999;
  }
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

const InputBottomLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f1f1f5;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 84px;
  padding: 16px;
  position: fixed;
  bottom: 0px;
  left: 0px;
`

const Button = styled.button`
  border: none;
  border-radius: 12px;
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
  color: #ffffff;
`
