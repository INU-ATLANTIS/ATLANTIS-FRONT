import styled from 'styled-components'
import { BottomNavigation } from '../components/BottomNavigation'
import client from '../lib/client'
import { useEffect, useState } from 'react'
import { format } from 'date-fns/format'

export default function Posts() {
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
      <TitleContainer>
        <span>최신 게시글</span>
      </TitleContainer>

      <PostList>
        {posts &&
          posts.latestList.map(({ postId, title, content, writeDatetime }) => (
            <li key={postId}>
              <Title>{title}</Title>
              <Content>{content}</Content>
              <DateText>
                {format(new Date(writeDatetime), 'MM.dd 작성')}
              </DateText>
            </li>
          ))}
      </PostList>

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

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 80px;

  li {
    padding: 16px;
    border-top: 1px solid #f1f1f5;
  }
`

const Title = styled.span`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #111111;
  font-weight: 600;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`

const Content = styled.p`
  margin: 4px 0px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #505050;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const DateText = styled.span`
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.4px;
  color: #999999;
`
