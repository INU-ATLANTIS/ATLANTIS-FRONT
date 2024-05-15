import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "../components/TopNavigation";
import { useParams } from "react-router-dom";
import client from "../lib/client";
import styled from "styled-components";
import { format } from "date-fns/format";
import { BottomSheet } from "../components/BottomSheet";
import { Avatar } from "antd";
import profileImg from "../assets/profileImg.png";

import { ReactComponent as LikeIcon } from '../assets/icons/thumb_up.svg'
import { ReactComponent as CommentIcon } from '../assets/icons/chat.svg'
import { ReactComponent as ReplyCommentIcon } from '../assets/icons/prompt_suggestion.svg'
import { HXAP } from '../bridge'

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const contentRef = useRef(null)
  const commentIdRef = useRef(null)

  const [post, setPost] = useState();
  const [myPosts, setMyPosts] = useState();
  const [comments, setComments] = useState();
  const [replyComments, setReplyComments] = useState();
  const [myComments, setMyComments] = useState();
  const [openCommentBottomSheet, setOpenCommentBottomSheet] = useState(false);

  useEffect(() => {
    const setPostAsync = async () => {
      const token = await HXAP.loadData('token')

      client.interceptors.request.use(config => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }

        return config
      })
      const response = await client.get(`/post/${postId}`);
      const myPostResponse = await client.get('/post/my');
      const commentResponse = await client.get(`/post/${postId}/comment-list`);
      const myCommentResponse = await client.get("/post/comment/my");

      setPost(response.data);
      setMyPosts(myPostResponse.data);
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
      setMyComments(myCommentResponse.data.myComments)
    }

    setPostAsync()
  }, [postId]);

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
    const myCommentResponse = await client.get('/post/comment/my')
    setMyComments(myCommentResponse.data.myComments)

    setOpenCommentBottomSheet(false)
  }

  const handleReplyCommentPost = async () => {
    await client.post(`/post/${postId}/${commentIdRef.current}/comment`, {
      content: contentRef.current.value,
    })

    const commentResponse = await client.get(`/post/${postId}/comment-list`)

    setReplyComments(
      commentResponse.data.commentList.filter(
        ({ parentId }) => parentId !== null
      )
    )
    const myCommentResponse = await client.get('/post/comment/my')
    setMyComments(myCommentResponse.data.myComments)

    setOpenCommentBottomSheet(false)
  }

  const handleLikeClick = async () => {
    await client.put(`/post/${postId}/like`)

    const postResponse = await client.get(`/post/${postId}`)

    setPost(postResponse.data)
  }

  const handleCommentDelete = async commentId => {
    await client.delete(`/post/comment/${commentId}`)
    const myCommentResponse = await client.get('/post/comment/my')
    setMyComments(myCommentResponse.data.myComments)
    const commentResponse = await client.get(`/post/${postId}/comment-list`)

    setComments(
      commentResponse.data.commentList.filter(
        ({ parentId }) => parentId === null
      )
    )
    setReplyComments(
      commentResponse.data.commentList.filter(
        ({ parentId }) => parentId !== null
      )
    );
  };

  const handlePostDelete = async postId => {
    await client.delete(`/post/${postId}`)

    const response = await client.get('/post/my')
    setMyPosts(response.data)
    navigate(`/posts`)
  }

  const handlePostEdit = async postId => {
    navigate(`/posting/${postId}`)
  }


  if (post === undefined) return null
  return (
    <Container>
      <TopNavigation />
      <HeaderContainer>
        <Header>
          <Avatar src={post.writerProfileImage ?? profileImg} size={30} />
          <WriterName>{post.writerNickname ?? "익명"}</WriterName>

        </Header>
        {myPosts &&
          myPosts.myPosts.some(
            (myPost) => myPost.postId === post.postId
          ) && (<MyPostControlContainer>
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                handlePostEdit(post.postId);
              }}
            >
              수정
            </EditButton>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                handlePostDelete(post.postId);
              }}
            >
              삭제
            </DeleteButton>
          </MyPostControlContainer>
          )}
      </HeaderContainer>
      <ContentContainer>
        <Title>{post.title}</Title>

        <Content>{post.content}</Content>

        {post.postImageList &&
          post.postImageList.map((image, index) => (
            <PostImg key={index} src={image} alt={`Post Image ${index}`} />
          ))}
      </ContentContainer>

      <LikeAndCommentInfoContainer>
        <div>
          <InfoText>{format(new Date(post.writeDatetime), 'MM.dd')}</InfoText>
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
                <div>
                  <ReplyCommentButton
                    onClick={() => {
                      commentIdRef.current = commentId
                      setOpenCommentBottomSheet(true)
                    }}
                  >
                    답글 작성
                  </ReplyCommentButton>
                  {myComments &&
                    myComments.some(
                      comment => comment.commentId === commentId
                    ) && (
                      <DeleteButton
                        onClick={e => {
                          e.stopPropagation()
                          handleCommentDelete(commentId)
                        }}
                      >
                        삭제
                      </DeleteButton>
                    )}
                </div>
              </CommentContainer>

              {reply.map(({ nickname, writeDatetime, content, commentId }) => (
                <ReplyCommentContainer key={commentId}>
                  <ReplyCommentContainer2>
                    <ReplyCommentIcon />

                    <div>
                      <CommentNickname>{nickname ?? '익명'}</CommentNickname>
                      <CommentContent>{content}</CommentContent>
                      <CommentDateTime>
                        {format(new Date(writeDatetime), 'MM/dd HH:mm')}
                      </CommentDateTime>
                    </div>
                  </ReplyCommentContainer2>
                  {myComments &&
                    myComments.some(
                      comment => comment.commentId === commentId
                    ) && (
                      <DeleteButton
                        onClick={e => {
                          e.stopPropagation()
                          handleCommentDelete(commentId)
                        }}
                      >
                        삭제
                      </DeleteButton>
                    )}
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
`;
const HeaderContainer = styled.div`
align-items: flex-end;
justify-content: space-between;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`

const WriterName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #111111;
  margin-left: 10px;
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

const PostImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
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

const ReplyCommentContainer2 = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

const ReplyCommentContainer = styled.div`
  padding: 12px 0px;
  border-bottom: 1px solid #f1f1f5;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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
`;
const MyPostControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const EditButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background-color: #f7f7fb;
  color: #505050;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 12px;
  width: fit-content;
`;

const DeleteButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background-color: #e15241;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 12px;
  width: fit-content;
  margin-left: 8px;
`

const InfoText = styled.span`
  line-height: 18px;
  letter-spacing: -0.4px;
  color: #999999;
  margin-right: 15px;
  font-size: 15px;
  font-weight: 400;
  color: #505050;
`
