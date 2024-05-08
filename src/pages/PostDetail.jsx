import { useEffect, useRef, useState } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { useParams } from 'react-router-dom'
import client from '../lib/client'
import styled from 'styled-components'
import { format } from 'date-fns/format'
import { BottomSheet } from '../components/BottomSheet'

import { ReactComponent as LikeIcon } from '../assets/icons/thumb_up.svg'
import { ReactComponent as CommentIcon } from '../assets/icons/chat.svg'
import { ReactComponent as ReplyCommentIcon } from '../assets/icons/prompt_suggestion.svg'

export default function PostDetail() {
  const { postId } = useParams()

  const contentRef = useRef(null)
  const commentIdRef = useRef(null)

  const [post, setPost] = useState()
  const [comments, setComments] = useState()
  const [replyComments, setReplyComments] = useState()

  const [openCommentBottomSheet, setOpenCommentBottomSheet] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    client.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }

      return config
    })

    const setPostAsync = async () => {
      const response = await client.get(`/post/${postId}`)
      const commentResponse = await client.get(`/post/${postId}/comment-list`)

      setPost(response.data)
      setComments(
        commentResponse.data.commentList.filter(
          ({ parentId }) => parentId === null
        )
      )
      setReplyComments(
        commentResponse.data.commentList.filter(
          ({ parentId }) => parentId !== null
        )
      )
    }

    setPostAsync()
  }, [postId])

  const handleCommentPost = async () => {
    await client.post(`/post/${postId}/comment`, {
      content: contentRef.current.value,
    })

    const commentResponse = await client.get(`/post/${postId}/comment-list`)

    setComments(
      commentResponse.data.commentList.filter(
        ({ parentId }) => parentId === null
      )
    )

    setOpenCommentBottomSheet(false)
  }

  const handleReplyCommentPost = async () => {
    await client.post(`/post/${commentIdRef.current}/comment`, {
      content: contentRef.current.value,
    })

    const commentResponse = await client.get(`/post/${postId}/comment-list`)

    setReplyComments(
      commentResponse.data.commentList.filter(
        ({ parentId }) => parentId !== null
      )
    )

    setOpenCommentBottomSheet(false)
  }

  const handleLikeClick = async () => {
    await client.put(`/post/${postId}/like`)

    const postResponse = await client.get(`/post/${postId}`)

    setPost(postResponse.data)
  }

  if (post === undefined) return null

  return (
    <Container>
      <TopNavigation />

      <Header>
        {/* <img src={post.writerProfileImage} alt="profile" /> */}

        <WriterName>{post.writerNickname ?? '익명'}</WriterName>
      </Header>

      <ContentContainer>
        <Title>{post.title}</Title>

        <Content>{post.content}</Content>
      </ContentContainer>

      <LikeAndCommentInfoContainer>
        <div>
          <LikeAndComment>
            <LikeIcon />
            <span>{post.likeCount}</span>
          </LikeAndComment>

          <LikeAndComment>
            <CommentIcon />
            <span>
              {comments && replyComments
                ? comments.length + replyComments.length
                : 0}
            </span>
          </LikeAndComment>
        </div>

        <LikeButton onClick={handleLikeClick}>좋아요</LikeButton>
      </LikeAndCommentInfoContainer>

      <Divider></Divider>

      {comments &&
        comments.map(({ nickname, writeDatetime, content, commentId }) => {
          const reply = replyComments.filter(
            ({ parentId }) => parentId === commentId
          )

          return (
            <>
              <CommentContainer key={commentId}>
                <div>
                  <CommentNickname>{nickname ?? '익명'}</CommentNickname>
                  <CommentContent>{content}</CommentContent>
                  <CommentDateTime>
                    {format(new Date(writeDatetime), 'MM/dd HH:mm')}
                  </CommentDateTime>
                </div>

                <ReplyCommentButton
                  onClick={() => {
                    commentIdRef.current = commentId
                    setOpenCommentBottomSheet(true)
                  }}
                >
                  답글 작성
                </ReplyCommentButton>
              </CommentContainer>

              {reply.map(({ nickname, writeDatetime, content, commentId }) => (
                <ReplyCommentContainer key={commentId}>
                  <ReplyCommentIcon />

                  <div>
                    <CommentNickname>{nickname ?? '익명'}</CommentNickname>
                    <CommentContent>{content}</CommentContent>
                    <CommentDateTime>
                      {format(new Date(writeDatetime), 'MM/dd HH:mm')}
                    </CommentDateTime>
                  </div>
                </ReplyCommentContainer>
              ))}
            </>
          )
        })}

      <div style={{ height: 56 }}></div>
      <CommentInputContainer>
        <CommentInput onClick={() => setOpenCommentBottomSheet(true)}>
          댓글을 입력해주세요
        </CommentInput>
      </CommentInputContainer>

      <BottomSheet
        height="full"
        open={openCommentBottomSheet}
        onOpenChange={open => {
          if (!open && commentIdRef.current) {
            commentIdRef.current = undefined
          }
          setOpenCommentBottomSheet(open)
        }}
      >
        <BottomSheetContent>
          <ContentTextarea ref={contentRef} />

          <CommentPostButtonContainer>
            <Button
              variant="primary"
              onClick={() => {
                if (commentIdRef.current) {
                  handleReplyCommentPost()
                } else {
                  handleCommentPost()
                }
              }}
            >
              {commentIdRef.current ? '답글 등록' : '댓글 등록'}
            </Button>
          </CommentPostButtonContainer>
        </BottomSheetContent>
      </BottomSheet>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 24px 16px 0px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const WriterName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #111111;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`

const Title = styled.span`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  color: #111111;
  word-break: keep-all;
  white-space: pre-wrap;
`

const Content = styled.p`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #505050;
  margin: 16px 0 24px;
  word-break: keep-all;
  white-space: pre-wrap;
`

const LikeAndCommentInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  div:first-child {
    display: flex;
    align-items: center;
  }
`

const LikeAndComment = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 12px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #505050;
  }
`

const LikeButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background-color: #ecf2ff;
  color: #185aff;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 12px;
  width: fit-content;
`

const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100vw;
  padding: 16px;
`

const CommentInput = styled.button`
  border: none;
  display: flex;
  align-items: center;
  background-color: #f7f7fb;
  height: 100%;
  width: 100%;
  padding-left: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #767676;
`

const Divider = styled.div`
  margin: 0px -16px;
  margin-top: 20px;
  width: 100vw;
  background-color: #f1f1f5;
  height: 16px;
`

const CommentContainer = styled.div`
  padding: 12px 0px;
  border-bottom: 1px solid #f1f1f5;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const ReplyCommentContainer = styled.div`
  padding: 12px 0px;
  border-bottom: 1px solid #f1f1f5;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

const ReplyCommentButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background-color: #f7f7fb;
  color: #505050;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 12px;
  width: fit-content;
`

const CommentNickname = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111111;
  line-height: 24px;
`

const CommentContent = styled.p`
  font-size: 16px;
  line-height: 150%;
  font-weight: 400;
  color: #767676;
  margin: 4px 0px 4px;
  word-break: keep-all;
  white-space: pre-wrap;
`

const CommentDateTime = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  line-height: 18px;
`

const BottomSheetContent = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentTextarea = styled.textarea`
  width: calc(100vw - 32px);
  height: 300px;
  margin-top: 32px;
  background-color: #f7f7fb;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  line-height: 24px;
  resize: none;
`

const CommentPostButtonContainer = styled.div`
  margin-top: 24px;
  padding: 0px 16px;
  width: 100%;
`

const Button = styled.button`
  border: none;
  border-radius: 12px;
  height: 52px;
  min-height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
  color: #ffffff;
`
