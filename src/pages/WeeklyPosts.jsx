import styled from 'styled-components'
import client from '../lib/client'
import { useEffect, useState } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { PostListItem } from '../components/PostListItem'

export default function WeeklyPosts() {
  const [posts, setPosts] = useState()

  useEffect(() => {
    const getPosts = async () => {
      const response = await client.get('/post/top')

      setPosts(response.data)
    }

    getPosts()
  }, [])

  return (
    <Container>
      <TopNavigation />

      <TitleContainer>
        <span>주간 상위 게시글</span>
      </TitleContainer>

      <PostList>
        {posts && posts.topList.map(post => <PostListItem {...post} />)}
      </PostList>
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
