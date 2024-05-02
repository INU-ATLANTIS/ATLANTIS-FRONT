import { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import client from '../../lib/client'

export function EmailCheck({ onNext }) {
  const emailInputRef = useRef(null)
  const [duplicationChecked, setDuplicationChecked] = useState(false)

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

  const checkEmailDuplication = async e => {
    try {
      const response = await client.post(`/auth/email-check`, {
        email: emailInputRef.current.value,
      })

      if (response.status === 200 && response.data.code === 'SU') {
        alert('사용 가능한 이메일입니다.')
        setDuplicationChecked(true)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      handleErrorResponse(error)
    }
  }

  //인증번호 받기
  const requestCertificationNumber = async e => {
    try {
      const response = await client.post(`/auth/email-certification`, {
        email: emailInputRef.current.value,
      })

      if (response.status === 200 && response.data.code === 'SU') {
        alert('인증번호가 이메일로 발송되었습니다.')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      handleErrorResponse(error)
    }
  }

  return (
    <>
      <Top>
        가입을 위해
        <br />
        이메일을 입력해주세요
      </Top>

      <div style={{ height: 40 }}></div>

      <InputContainer>
        <Label>이메일</Label>
        <EmailInput
          ref={emailInputRef}
          type="email"
          placeholder="학교 이메일을 입력해주세요"
        />
        <InputBottomLine />
      </InputContainer>

      <DuplicationCheckButtonContainer>
        <Button variant="secondary" onClick={checkEmailDuplication}>
          중복 확인
        </Button>
      </DuplicationCheckButtonContainer>

      <BottomContainer>
        <div style={{ height: 84 }}></div>

        <Button
          variant="primary"
          disabled={!duplicationChecked}
          onClick={async () => {
            await requestCertificationNumber()

            onNext(emailInputRef.current.value)
          }}
        >
          인증번호 받기
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

const EmailInput = styled.input`
  border: none;
  font-size: 24px;
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
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 100%;

  ${({ theme, variant }) =>
    variant === 'primary'
      ? css`
          background-color: ${theme.primaryColor};
          color: #ffffff;
        `
      : css`
          background-color: #ecf2ff;
          color: #185aff;
        `}
`

const DuplicationCheckButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  padding: 0px 16px;
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
