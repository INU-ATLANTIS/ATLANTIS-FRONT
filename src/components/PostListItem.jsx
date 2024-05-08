import { format } from 'date-fns/format'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as LikeIcon } from '../assets/icons/thumb_up.svg'
import { ReactComponent as CommentIcon } from '../assets/icons/chat.svg'

export function PostListItem({
  postId,
  title,
  content,
  writeDatetime,
  likeCount,
  commentCount,
}) {
  const navigate = useNavigate()

  return (
    <li
      key={postId}
      onClick={() => {
        navigate(`/post/${postId}`)
      }}
    >
      <Title>{title}</Title>
      <Content>{content}</Content>

      <InfoContainer>
        <InfoText>{format(new Date(writeDatetime), 'MM.dd')}</InfoText>

        {likeCount !== 0 && (
          <LikeAndCommentContainer>
            <LikeIcon />
            <InfoText>{likeCount}</InfoText>
          </LikeAndCommentContainer>
        )}

        {commentCount !== 0 && (
          <LikeAndCommentContainer>
            <CommentIcon />
            <InfoText>{commentCount}</InfoText>
          </LikeAndCommentContainer>
        )}
      </InfoContainer>
    </li>
  )
}

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

const InfoText = styled.span`
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.4px;
  color: #999999;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const LikeAndCommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
