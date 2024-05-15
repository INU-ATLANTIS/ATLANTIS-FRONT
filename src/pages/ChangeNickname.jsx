import React, { useState } from 'react'
import client from '../lib/client'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { TopNavigation } from '../components/TopNavigation'
import { BottomNavigation } from '../components/BottomNavigation'
import profileImg from '../assets/profileImg.png'
import { HXAP } from '../bridge'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0 16px;
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

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 220px;
  padding: 16px;
  position: fixed;
  bottom: 0px;
  left: 0px;
`

const Button = styled(Link)`
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
  margin: 20px 0;

  ${({ theme }) => css`
    background-color: ${theme.primaryColor};
  `};
`

const ClearButton = styled(Link)`
  border: none;
  border-radius: 12px;
  text-decoration: none;
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

function ChangeNickname() {
  const [newNickname, setNewNickname] = useState('')
  const navigate = useNavigate()

  const updateNickname = async () => {
    try {
      const token = await HXAP.loadData('token')

      await client.patch(
        `/user/nickname`,
        { nickname: newNickname },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      alert('닉네임이 성공적으로 변경되었습니다.')
      navigate('/LoginUserInfo')
    } catch (error) {
      alert('닉네임 변경에 실패했습니다.')
    }
  }

  const handleNicknameReset = async () => {
    try {
      const token = await HXAP.loadData('token')

      // Patch request to reset nickname
      const responseNickname = await client.patch(
        '/user/nickname',
        { nickname: null },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (responseNickname.status === 200) {
        const responseImage = await client.patch(
          '/user/profileimage',
          { profileImage: null },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        if (responseImage.status === 200) {
          alert('닉네임 및 프로필 사진이 초기화되었습니다.')
          navigate('/LoginUserInfo')
        } else {
          throw new Error(
            `Failed to reset profile image: ${responseImage.statusText}`
          )
        }
      } else {
        throw new Error(
          `Failed to reset nickname: ${responseNickname.statusText}`
        )
      }
    } catch (error) {
      console.error('닉네임 또는 프로필 사진 초기화 실패:', error)
      alert('닉네임 또는 프로필 사진 초기화 실패: ' + error.message)
    }
  }

  return (
    <Container>
      <TopNavigation />
      <Top>닉네임 변경</Top>
      <div style={{ height: 20 }}></div>
      <InputContainer>
        <Input
          type="text"
          placeholder="새 닉네임"
          value={newNickname}
          onChange={e => setNewNickname(e.target.value)}
        />
        <InputBottomLine />
      </InputContainer>
      <BottomContainer>
        <ClearButton onClick={handleNicknameReset}>닉네임 초기화</ClearButton>
        <Button onClick={updateNickname}>변경</Button>
      </BottomContainer>
      <BottomNavigation />
    </Container>
  )
}

export default ChangeNickname
