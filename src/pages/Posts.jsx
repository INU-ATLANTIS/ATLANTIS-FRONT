import styled from 'styled-components'
import { BottomNavigation } from '../components/BottomNavigation'
import client from '../lib/client'
import { useEffect } from 'react'

export default function Posts() {
  useEffect(() => {
    const getPosts = async () => {
      const response = await client.get('/post/latest-list')

      console.log(response)
    }

    getPosts()
  }, [])

  return (
    <Container>
      <TitleContainer>
        <span>게시글 목록</span>
      </TitleContainer>

      <BottomNavigation />
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const TitleContainer = styled.div`
  display: flex;
  height: 58px;
  align-items: flex-end;
  padding-left: 16px;
  margin-bottom: 40px;
  margin-top: 56px;

  span {
    color: #111111;
    font-weight: 600;
    font-size: 28px;
    line-height: 38px;
  }
`
