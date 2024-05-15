import React, { useState, useEffect } from 'react'
import client from '../lib/client'
import { Link } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Avatar } from 'antd'
import arrow from '../assets/ArrowLeft.png'
import profileImg from '../assets/profileImg.png'
import { HXAP } from '../bridge'

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
  }
`
const THEMES = {
  light: { backgroundColor: '#ffffff', color: '#000000' },
  dark: { backgroundColor: '#03040c', color: '#ffffff' },
}

const Container = styled.div`
  width: 400px;
  margin: auto;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto 50px;
  padding: 0 10px;
  font-size: 22px;
`
const Arrow = styled.img`
  width: 24px;
`
const Title = styled.div`
  flex-grow: 1;
  text-align: center;
  margin-right: 15px;
`
const Span = styled(Link)``

const ProfileImgContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  background-color: #f6f6f6;
  padding: 30px 0;
  align-items: center;
  margin: 20px;
  width: 360px;
`

function UserInfo() {
  const email = ''
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    profileImage: profileImg,
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await HXAP.loadData('token')
        const response = await client.get(`/user/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const fetchedProfileImage = response.data.profileImage || profileImg
        setUserInfo({
          email: response.data.email,
          nickname: response.data.nickname,
          profileImage: fetchedProfileImage,
        })
      } catch (err) {
        const message =
          err.response?.data?.message || 'Failed to fetch user information.'
        setError(message)
      }
    }
    fetchUserInfo()
  }, [])

  return (
    <ThemeProvider theme={THEMES['light']}>
      <Container>
        <GlobalStyle />
        <Header>
          <Span to="/home">
            <Arrow src={arrow} alt="이전" />
          </Span>
          <Title>유저 정보</Title>
        </Header>
        <Form>
          <UserContainer>
            <ProfileImgContainer>
              <Avatar src={userInfo.profileImage} size={100} />
            </ProfileImgContainer>
            <div>
              <p>닉네임: {userInfo.nickname || 'Not provided'}</p>
              <p>이메일: {userInfo.email || 'Not provided'}</p>
            </div>
          </UserContainer>
        </Form>
      </Container>
    </ThemeProvider>
  )
}

export default UserInfo
