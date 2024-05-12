import React, { useState, useEffect, useRef } from 'react'
import client from '../lib/client'
import { Link } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Avatar } from 'antd'
import arrow from '../assets/ArrowLeft.png'
import profileImg from '../assets/profileImg.png'

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
  display: inline-block; // 또는 필요에 따라 flex 사용
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SmallButton = styled(Link)`
  background-color: #004a9e;
  border: none;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  padding: 0 16px;
  width: 60px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
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
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
`

function LoginUserInfo() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
  })
  const [Image, setImage] = useState(profileImg)
  const fileInput = useRef(null)
  const [error, setError] = useState('')
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const onChange = async e => {
    if (e.target.files[0]) {
      console.log('Selected file:', e.target.files[0])
      const fileUrl = await uploadFile(e.target.files[0])
      console.log('Uploaded file URL:', fileUrl)
      if (fileUrl) {
        await updateProfileImage(fileUrl)
        console.log('Profile image updated successfully')
        setImage(fileUrl)
      }
    } else {
      console.log('No file selected, reverting to default profile image')
      setImage(profileImg)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const uploadFile = async file => {
    console.log('Uploading file:', file)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await client.post(`/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Server response:', response)
      return response.data
    } catch (error) {
      console.error('Error uploading file:', error)
      setError(error.message)
      return ''
    }
  }

  const updateProfileImage = async imageUrl => {
    try {
      const token = localStorage.getItem('token')
      const response = await client.patch(
        `/user/profileimage`,
        { profileImage: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const timestamp = new Date().getTime()
      const updatedImageUrl = `${imageUrl}?t=${timestamp}`

      setUserInfo(prevState => ({
        ...prevState,
        profileImage: updatedImageUrl,
      }))

      setImage(updatedImageUrl)
      setUploadedImageUrl(updatedImageUrl)
    } catch (error) {
      console.error('Error updating profile image:', error)
      setError(error.message)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('로그인이 필요합니다.')
        return
      }

      const isConfirmed = window.confirm('정말로 계정을 삭제하시겠습니까?')
      if (!isConfirmed) {
        console.log('계정 삭제가 취소되었습니다.')
        return
      }

      await client.delete(`/auth/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      localStorage.clear()
      window.location.href = '/'
    } catch (error) {
      console.error('Error deleting account:', error.response || error)
      alert(
        'Error deleting account: ' +
          (error.response?.data?.message || 'Unknown error')
      )
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error(
            'No token found, user must be logged in to fetch profile.'
          )
          return
        }
        const response = await client.get(`/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const { email, nickname, profileImage } = response.data
        setUserInfo({ email, nickname, profileImage })
        setImage(profileImage || profileImg)
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
          <Title>로그인 유저 정보</Title>
        </Header>
        <Form>
          <UserContainer>
            <ProfileImgContainer>
              <Avatar
                src={Image}
                size={100}
                onClick={() => {
                  fileInput.current.click()
                }}
              />
              <input
                type="file"
                style={{ display: 'none' }}
                name="profile_img"
                onChange={onChange}
                ref={fileInput}
              />
            </ProfileImgContainer>
            <div>
              <Row>
                <p>닉네임: {userInfo.nickname || 'Not provided'}</p>

                <SmallButton to="/ChangeNickname">변경</SmallButton>
              </Row>
              <p>이메일: {userInfo.email || 'Not provided'}</p>
            </div>
          </UserContainer>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Button onClick={handleDeleteAccount}>회원 탈퇴</Button>
        </Form>
      </Container>
    </ThemeProvider>
  )
}

export default LoginUserInfo
