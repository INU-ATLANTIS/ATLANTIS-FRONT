import styled from 'styled-components'
import { TopNavigation } from '../components/TopNavigation'
import { useEffect, useState } from 'react'
import client from '../lib/client'
import { PostListItem } from '../components/PostListItem'
import { useNavigate } from 'react-router-dom'
import { HXAP } from '../bridge'

export default function MyPosts() {
  const navigate = useNavigate()

  const [posts, setPosts] = useState()

  useEffect(() => {
    const getPosts = async () => {
      const token = await HXAP.loadData('token')

      client.interceptors.request.use(config => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }

        return config
      })

      const response = await client.get('/post/my')

      setPosts(response.data)
    }

    getPosts()
  }, [])

  const handlePostDelete = async postId => {
    await client.delete(`/post/${postId}`)

    const response = await client.get('/post/my')
    setPosts(response.data)
  }

  const handlePostEdit = async postId => {
    navigate(`/posting/${postId}`)
  }

  return (
    <Container>
      <TopNavigation />

      <TitleContainer>
        <span>내 게시글</span>
      </TitleContainer>

      <PostList>
        {posts &&
          posts.myPosts.map(post => (
            <PostListItem
              {...post}
              myPost
              onDeletePost={handlePostDelete}
              onEditPost={handlePostEdit}
            />
          ))}
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
