import { useState } from 'react'
import styled from 'styled-components'
import client from '../../lib/client'

export default function Verification({ email, onNext }) {
  const [verificationNum, setVerificationNum] = useState('')

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

  const verifyCertificationNumber = async verificationNum => {
    try {
      const response = await client.post(`/auth/check-certification`, {
        email,
        certificationNumber: verificationNum,
      })

      if (response.status === 200 && response.data.code === 'SU') {
        alert('이메일 인증이 성공적으로 완료되었습니다.')
        onNext(verificationNum)
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
        전송된 인증번호를
        <br />
        입력해주세요
      </Top>

      <div style={{ height: 40 }}></div>

      <InputContainer>
        <Label>이메일</Label>
        <VerificationNumberInput
          autoFocus
          type="text"
          inputMode="tel"
          placeholder="숫자 5자리"
          value={verificationNum}
          onChange={e => {
            setVerificationNum(e.currentTarget.value)

            if (e.currentTarget.value.length === 5) {
              verifyCertificationNumber(e.currentTarget.value)
            }
          }}
        />
        <InputBottomLine />
      </InputContainer>
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

const VerificationNumberInput = styled.input`
  border: none;
  font-size: 24px;
  line-height: 34px;
  margin: 0;

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
