import styled from 'styled-components'
import { BottomNavigation } from '../components/BottomNavigation'
import client from '../lib/client'
import { useEffect, useState } from 'react'
import { ReactComponent as RightArrow } from '../assets/icons/arrow_right.svg'
import { useNavigate } from 'react-router-dom'

import { PostListItem } from '../components/PostListItem'
import { PostFAB } from '../components/PostFAB'

export default function Posts() {
  const navigate = useNavigate()

  const [posts, setPosts] = useState()

  useEffect(() => {
    const getPosts = async () => {
      const response = await client.get('/post/latest-list')

      setPosts(response.data)
    }

    getPosts()
  }, [])

  return (
    <Container>
      <TopBoxContainer>
        <TopBox onClick={() => navigate('/posts/weeklyPosts')}>
          <TopBoxTitle>주간 인기 게시글</TopBoxTitle>

          <RightArrow />
        </TopBox>

        <TopBox onClick={() => navigate('/myPosts')}>
          <TopBoxTitle>내 게시글</TopBoxTitle>

          <RightArrow />
        </TopBox>
      </TopBoxContainer>

      <TitleContainer>
        <span>최신 게시글</span>
      </TitleContainer>

      <PostList>
        {posts && posts.latestList.map(post => <PostListItem {...post} />)}
      </PostList>

      <PostFAB postMode="post" />

      <BottomNavigation />
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`

const TopBoxContainer = styled.div`
  margin: 16px;
  margin-bottom: 0px;
  display: flex;
  gap: 16px;
`

const TopBox = styled.div`
  background-color: #f7f7fb;
  border-radius: 16px;
  width: 100%;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TopBoxTitle = styled.span`
  font-size: 18px;
  line-height: 24px;
  color: #505050;
  font-weight: 600;
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

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 80px;
  width: 100vw;

  li {
    padding: 16px;
    border-top: 1px solid #f1f1f5;
  }
`
